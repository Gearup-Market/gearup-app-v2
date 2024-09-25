import { HttpException } from "@/core/exceptions/HttpException";
import {
	Asset,
	Horizon,
	Keypair,
	Networks,
	NotFoundError,
	Operation,
	StrKey,
	TransactionBuilder,
	server,
	stellar,
	xdr,
} from "./sdk";
import { decrypt, encrypt } from "../enc";
import StellarWalletModel from "@/modules/stellar-wallet/models/stellarWallet";
import { IWeb3Wallet } from "@/modules/stellar-wallet/types";
import { isStellarMainnet } from "@/core/utils/environment";
import { ServerApi } from "@stellar/stellar-sdk/lib/horizon";
import BigNumber from "bignumber.js";

export const createStellarAccount = () => {
	const accountKeyPair = stellar.account().createKeypair();
	return {
		publicKey: accountKeyPair.publicKey,
		secret: accountKeyPair.secretKey,
	};
};

export async function fetchAccount(publicKey: string) {
	if (!StrKey.isValidEd25519PublicKey(publicKey))
		throw new HttpException(400, "invalid public key");
	try {
		let account = await server.accounts().accountId(publicKey).call();
		return account;
	} catch (err) {
		throw new HttpException(
			err.response?.status ?? 400,
			err.message
		);
	}
}

export async function fetchAccountBalances(publicKey: string): Promise<{
	xlmBalance: string;
	balances: Balance[]
}> {
	const { balances } = await fetchAccount(publicKey);
	let xlmBalance = '';
	const _balances = balances.map(balance => {
		if(balance.asset_type === "native") xlmBalance = balance.balance
		return {
			asset: balance.asset_type === "native" ? "XLM" : balance.asset_type,
			balance: balance.balance,
		}
	});

	return {
		xlmBalance,
		balances: _balances
	}
}

export async function fundWithFriendbot(publicKey: string) {
	try {
		console.log(`requesting funding for ${publicKey}`);
		return await server.friendbot(publicKey).call();
	} catch (error) {
		console.log(error);
	}
}

export interface Balance {
	asset: string;
	balance: string;
}

export interface TransactionDetail {
	id: string;
	createdAt: string;
	fee: string;
	memo?: string;
	memoType?: string;
	operationCount: number;
	sourceAccount: string;
	successful: boolean;
	feeAccount?: string;
	transfers: TransferDetail[];
	totalReceived: string;
	totalSent: string;
	hash: string;
}

export interface TransferDetail {
	amount: string;
	asset: string;
	from: string;
	to: string;
	type: "incoming" | "outgoing";
}
class StellarWalletUtility {
	private server: Horizon.Server;
	private adminKeypair: Keypair;
	private model: typeof StellarWalletModel;

	constructor({
		adminSecretKey,
		model,
	}: {
		adminSecretKey?: string;
		model: typeof StellarWalletModel;
	}) {
		this.server = server;
		this.model = model;
		if (adminSecretKey) {
			this.adminKeypair = Keypair.fromSecret(adminSecretKey);
		} else {
			this.setAdminKeyPair();
		}
	}

	private async setAdminKeyPair() {
		const adminWallet = await this.model.findOne({ isMaster: true }).lean();
		if (!adminWallet) throw new Error("No master wallet found");
		const secret = this.decryptSecret(adminWallet.encryptedKey, adminWallet.password);
		this.adminKeypair = Keypair.fromSecret(secret);
	}

	private encryptSecret(secret: string, password: string): string {
		return encrypt(secret, password);
	}

	private decryptSecret(encryptedSecret: string, password: string): string {
		return decrypt(encryptedSecret, password);
	}

	async createStellarWallet(
		password: string
	): Promise<{ publicKey: string; encryptedKey: string }> {
		const { publicKey, secret } = createStellarAccount();
		const encryptedKey = this.encryptSecret(secret, password);
		await this.fundAccount(publicKey);
		return { publicKey, encryptedKey };
	}

	async createAndStoreWallet(userId: string, password: string): Promise<IWeb3Wallet> {
		const { publicKey, secret } = createStellarAccount();
		const encryptedKey = this.encryptSecret(secret, password);
		const wallet = await this.model.create({
			userId,
			publicKey,
			encryptedKey,
		});
		this.fundAccount(publicKey);
		return wallet.toJSON() as IWeb3Wallet;
	}

	private async fundAccount(
		destinationPublicKey: string,
		amount: string = "1"
	): Promise<void> {
		try {
			await this.server.loadAccount(destinationPublicKey);
			console.log("Account already exists");
		} catch (e) {
			if (e instanceof NotFoundError) {
				// Account doesn't exist, create and fund it
				const adminAccount = await this.server.loadAccount(
					this.adminKeypair.publicKey()
				);

				const transaction = new TransactionBuilder(adminAccount, {
					fee: await this.fetchBaseFee(),
					networkPassphrase: this.getNetwork(),
				})
					.addOperation(
						Operation.createAccount({
							destination: destinationPublicKey,
							startingBalance: amount,
						})
					)
					.setTimeout(30)
					.build();

				transaction.sign(this.adminKeypair);

				await this.server.submitTransaction(transaction, {
					skipMemoRequiredCheck: true,
				});
				console.log(
					`Account ${destinationPublicKey} created and funded with ${amount} XLM`
				);
			} else {
				throw e;
			}
		}
	}

	public async getBalance(publicKey: string): Promise<string> {
		const account = await this.server.loadAccount(publicKey);
		const balance = account.balances.find(b => b.asset_type === "native");
		return balance ? balance.balance : "0";
	}

	public async getBalances(
		publicKey: string
	): Promise<{ xlmBalance: string; balances: Balance[]}> {
		return await fetchAccountBalances(publicKey);
	}

	private async fetchBaseFee(): Promise<string> {
		return (await this.server.fetchBaseFee()).toString();
	}

	private getNetwork() {
		return isStellarMainnet() ? Networks.PUBLIC : Networks.TESTNET;
	}

	private async calculateTotalCost(amount: string, includeFeeFromSource: boolean = true): Promise<{ total: string, fee: string }> {
		try {
		  const fee = await this.server.fetchBaseFee();
		  const amountBN = new BigNumber(amount);
		  const feeBN = new BigNumber(fee.toString()).dividedBy(10000000); // Convert stroops to XLM
	
		  let totalBN: BigNumber;
	
		  if (includeFeeFromSource) {
			totalBN = amountBN.plus(feeBN);
		  } else {
			totalBN = amountBN;
		  }
	
		  return {
			total: totalBN.toFixed(7),
			fee: feeBN.toFixed(7)
		  };
		} catch (error) {
		  console.error('Error calculating total cost:', error);
		  throw error;
		}
	  }

	public async sendXLMPayment(
		senderUserId: string,
		recipientPublicKey: string,
		amount: string
	): Promise<Horizon.HorizonApi.SubmitTransactionResponse> {
		const sender = await this.model.findOne({ userId: senderUserId }).lean();
		if (!sender) {
			throw new Error("Sender wallet not found");
		}

		const senderSecret = this.decryptSecret(sender.encryptedKey, sender.password);
		const senderKeypair = Keypair.fromSecret(senderSecret);
		const senderAccount = await this.server.loadAccount(senderKeypair.publicKey());

		const transaction = new TransactionBuilder(senderAccount, {
			fee: await this.fetchBaseFee(),
			networkPassphrase: this.getNetwork(),
		})
			.addOperation(
				Operation.payment({
					destination: recipientPublicKey,
					asset: Asset.native(),
					amount: amount,
				})
			)
			.setTimeout(30)
			.build();

		transaction.sign(senderKeypair);
		const result = await this.server.submitTransaction(transaction, {
			skipMemoRequiredCheck: true,
		});
		console.log(`Payment of ${amount} XLM sent to ${recipientPublicKey}`);
		return result;
	}

	public async createCustomTransaction(
		senderUserId: string,
		operations: Array<xdr.Operation>,
		adminPaysFee: boolean = false
	): Promise<string> {
		const sender = await this.model.findById(senderUserId);
		if (!sender) {
			throw new Error("Sender wallet not found");
		}

		const senderSecret = this.decryptSecret(sender.encryptedKey, sender.password);
		const senderKeypair = Keypair.fromSecret(senderSecret);

		const senderAccount = await this.server.loadAccount(senderKeypair.publicKey());
		const baseFee = await this.fetchBaseFee();
		const network = this.getNetwork();
		const transaction = new TransactionBuilder(senderAccount, {
			fee: baseFee,
			networkPassphrase: network,
		});

		operations.forEach(operation => {
			transaction.addOperation(operation);
		});

		const builtTx = transaction.setTimeout(30).build();
		builtTx.sign(senderKeypair);

		if (adminPaysFee) {
			const feeBumpTx = TransactionBuilder.buildFeeBumpTransaction(
				this.adminKeypair,
				baseFee,
				builtTx,
				network
			);

			feeBumpTx.sign(this.adminKeypair);

			try {
				const result = await this.server.submitTransaction(feeBumpTx);
				return result.hash;
			} catch (error) {
				console.error("Fee bump transaction failed", error);
				throw error;
			}
		} else {
			try {
				const result = await this.server.submitTransaction(builtTx);
				return result.hash;
			} catch (error) {
				console.error("Transaction failed", error);
				throw error;
			}
		}
	}

	private processOperations(
		publicKey: string,
		operations: ServerApi.OperationRecord[]
	): TransferDetail[] {
		return operations.reduce<TransferDetail[]>((transfers, op) => {
			let transfer: TransferDetail | null = null;

			switch (op.type) {
				case "payment":
					if (op.type_i === 1) {
						// Ensure it's a payment operation
						const paymentOp = op as ServerApi.PaymentOperationRecord;
						const isIncoming = paymentOp.to === publicKey;
						transfer = {
							amount: paymentOp.amount,
							asset:
								paymentOp.asset_type === "native"
									? "XLM"
									: `${paymentOp.asset_code}:${paymentOp.asset_issuer}`,
							from: paymentOp.from,
							to: paymentOp.to,
							type: isIncoming ? "incoming" : "outgoing",
						};
					}
					break;

				case "create_account":
					if (op.type_i === 0) {
						// Ensure it's a create account operation
						const createAccountOp =
							op as ServerApi.CreateAccountOperationRecord;
						const isIncoming = createAccountOp.account === publicKey;
						transfer = {
							amount: createAccountOp.starting_balance,
							asset: "XLM", // Create account operations are always in XLM
							from: createAccountOp.funder,
							to: createAccountOp.account,
							type: isIncoming ? "incoming" : "outgoing",
						};
					}
					break;

				case "path_payment_strict_receive":
					if (op.type_i === 2) {
						// Path payment strict receive
						const pathPaymentOp = op as ServerApi.PathPaymentOperationRecord;
						const isIncoming = pathPaymentOp.to === publicKey;
						transfer = {
							amount: isIncoming
								? pathPaymentOp.amount
								: pathPaymentOp.source_amount,
							asset: isIncoming
								? pathPaymentOp.asset_type === "native"
									? "XLM"
									: `${pathPaymentOp.asset_code}:${pathPaymentOp.asset_issuer}`
								: pathPaymentOp.source_asset_type === "native"
								? "XLM"
								: `${pathPaymentOp.source_asset_code}:${pathPaymentOp.source_asset_issuer}`,
							from: pathPaymentOp.from,
							to: pathPaymentOp.to,
							type: isIncoming ? "incoming" : "outgoing",
						};
					}
					break;
			}

			if (transfer) {
				transfers.push(transfer);
			}

			return transfers;
		}, []);
	}

	async getTransactions(
		publicKey: string,
		limit: number = 10,
		cursor?: string
	): Promise<{
		transactions: TransactionDetail[];
		nextCursor?: string;
	}> {
		try {
			let builder = this.server
				.transactions()
				.forAccount(publicKey)
				.limit(limit)
				.order("desc");

			if (cursor) {
				builder = builder.cursor(cursor);
			}

			const response = await builder.call();

			const transactions: TransactionDetail[] = await Promise.all(
				response.records.map(async tx => {
					const operations = await tx.operations();
					const transfers = this.processOperations(
						publicKey,
						operations.records
					);
					const totalReceived = transfers
						.reduce(
							(sum, t) =>
								t.type === "incoming" ? sum + parseFloat(t.amount) : sum,
							0
						)
						.toFixed(7);
					const totalSent = transfers
						.reduce(
							(sum, t) =>
								t.type === "outgoing" ? sum + parseFloat(t.amount) : sum,
							0
						)
						.toFixed(7);

					return {
						id: tx.id,
						createdAt: tx.created_at,
						fee: tx.fee_charged.toString(),
						memo: tx.memo,
						memoType: tx.memo_type,
						operationCount: tx.operation_count,
						sourceAccount: tx.source_account,
						successful: tx.successful,
						feeAccount: tx.fee_account,
						transfers,
						totalReceived,
						totalSent,
						hash: tx.hash,
					};
				})
			);

			return {
				transactions,
				nextCursor:
					response.records.length > 0
						? response.records[response.records.length - 1].paging_token
						: undefined,
			};
		} catch (error) {
			console.error("Error fetching transactions:", error);
			throw error;
		}
	}

	async getAllTransactions(publicKey: string): Promise<TransactionDetail[]> {
		let allTransactions: TransactionDetail[] = [];
		let cursor: string | undefined;

		do {
			const { transactions, nextCursor } = await this.getTransactions(
				publicKey,
				200,
				cursor
			);
			allTransactions = allTransactions.concat(transactions);
			cursor = nextCursor;
		} while (cursor);

		return allTransactions;
	}

	async getTransactionDetails(
		transactionId: string
	): Promise<ServerApi.TransactionRecord> {
		try {
			return await this.server.transactions().transaction(transactionId).call();
		} catch (error) {
			console.error("Error fetching transaction details:", error);
			throw error;
		}
	}
}

export default StellarWalletUtility;
