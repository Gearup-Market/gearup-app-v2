import { HttpException } from "@/core/exceptions/HttpException";
import stellarWalletModel from "@/modules/stellar-wallet/models/stellarWallet";
import {
	SorobanRpc,
	Contract,
	xdr,
	TransactionBuilder,
	Networks,
	Keypair,
	nativeToScVal,
	Address,
	ScInt,
  BASE_FEE,
} from "@stellar/stellar-sdk";
import { decrypt } from "../enc";
import { server } from "./sdk";

type NetworkPassphrase = typeof Networks.PUBLIC | typeof Networks.TESTNET | string;

export type SorobanType =
	| "Address"
	| "U32"
	| "I32"
	| "U64"
	| "I64"
	| "I128"
	| "Bool"
	| "String"
	| "Symbol"
	| "BigInt"
	| "Vec"
	| "Map"
	| "Void";

export interface TypedParam {
	type: SorobanType;
	value: any;
}

class ContractClient {
	private rpc: SorobanRpc.Server;
	private contract: Contract;
	private network: NetworkPassphrase;
	protected model: typeof stellarWalletModel;

	constructor(
		contractId: string,
		rpcUrl: string = "https://soroban-testnet.stellar.org",
		network: NetworkPassphrase = Networks.TESTNET
	) {
		this.rpc = new SorobanRpc.Server(rpcUrl);
		this.network = network;
		this.contract = new Contract(contractId);
		this.model = stellarWalletModel;
	}

	protected paramsToScVal(params: TypedParam[]): xdr.ScVal[] {
		return params.map(p => this.convertToScVal(p.type, p.value));
	}

	private convertToScVal(type: SorobanType, value: any): xdr.ScVal {
		switch (type) {
			case "Address":
				return Address.fromString(value).toScVal();
			case "U32":
				return xdr.ScVal.scvU32(value);
			case "I32":
				return xdr.ScVal.scvI32(value);
			case "U64":
				return xdr.ScVal.scvU64(xdr.Uint64.fromString(BigInt(value).toString()));
			case "I64":
				return xdr.ScVal.scvI64(xdr.Int64.fromString(BigInt(value).toString()));
			case "I128":
				return xdr.ScVal.scvI128(
					new xdr.Int128Parts({
						lo: xdr.Uint64.fromString(
							(BigInt(value) & BigInt("0xFFFFFFFFFFFFFFFF")).toString()
						),
						hi: xdr.Int64.fromString(
							(BigInt(value) >> BigInt(64)).toString()
						),
					})
				);
			case "Bool":
				return xdr.ScVal.scvBool(value);
			case "String":
				return xdr.ScVal.scvString(value);
			case "Symbol":
				return xdr.ScVal.scvSymbol(value);
			case "BigInt":
				return new ScInt(value).toScVal();
			case "Vec":
				if (!Array.isArray(value))
					throw new Error("Value must be an array for Vec type");
				return xdr.ScVal.scvVec(value.map(v => xdr.ScVal.scvString(v))); // Assuming Vec of strings
			// case 'Map':
			//   if (typeof value !== 'object' || value === null) throw new Error('Value must be an object for Map type');
			//   const map = new xdr.ScMapEntry.ScMap([]);
			//   for (const [k, v] of Object.entries(value)) {
			//     map.push(new xdr.ScMapEntry({
			//       key: xdr.ScVal.scvString(k),
			//       val: xdr.ScVal.scvString(v as string) // Assuming string values
			//     }));
			//   }
			//   return xdr.ScVal.scvMap(map);
			case "Void":
				return xdr.ScVal.scvVoid();
			default:
				throw new Error(`Unsupported type: ${type}`);
		}
	}

	protected async getSigner(userId: string): Promise<Keypair> {
		try {
			const wallet = await this.model.findOne({ userId }).lean();
			if (!wallet)
				throw new HttpException(
					400,
					"Contract client: could not find signer keys"
				);
			const signerSecret = decrypt(wallet.encryptedKey, wallet.password);
			const keypair = Keypair.fromSecret(signerSecret);
			return keypair;
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	private async getBaseFee(): Promise<string> {
		const fee = await server.fetchBaseFee()
    return fee?.toString() || BASE_FEE
	}

	private async getAdminKeyPair() {
		const secret = process.env.ADMIN_STELLAR_SECRET;
		if (secret) {
			return Keypair.fromSecret(process.env.ADMIN_STELLAR_SECRET);
		}

		const wallet = await this.model.findOne({ isMaster: true }).lean();
		if (!wallet) throw new HttpException(400, "No payer wallets found");
		const signerSecret = decrypt(wallet.encryptedKey, wallet.password);
		const keypair = Keypair.fromSecret(signerSecret);
		return keypair;
	}

	public async callFunction(
		functionName: string,
		signerId: string,
		...params: TypedParam[]
	): Promise<any> {
		const keypair = await this.getSigner(signerId);
		const source = await this.rpc.getAccount(keypair.publicKey());
		const fee = await this.getBaseFee();
		const argumentList = this.paramsToScVal(params);

		let transaction = new TransactionBuilder(source, {
			fee,
			networkPassphrase: this.network,
		})
			.addOperation(this.contract.call(functionName, ...argumentList))
			.setTimeout(30)
			.build();

		try {
			const simulateResponse: any = await this.rpc.simulateTransaction(transaction);
			// console.log('Simulation result:', simulateResponse);

      const minResourceFee = parseInt(simulateResponse.minResourceFee);
      console.log(`Min Resource Fee: ${minResourceFee}`);

      // Calculate the total fee (base fee + resource fee)
      // const totalFee = +fee + minResourceFee;

      // transaction = new TransactionBuilder(source, {
      //   fee: totalFee.toString(),
      //   networkPassphrase: this.network,
      // })
      //   .addOperation(this.contract.call(functionName, ...argumentList))
      //   .setTimeout(30)
      //   .build();

			const tx = await this.rpc.prepareTransaction(transaction);
			tx.sign(keypair);

			// const adminKeyPair = await this.getAdminKeyPair();
			// const feeBumpTx = TransactionBuilder.buildFeeBumpTransaction(
			// 	adminKeyPair,
			// 	(BigInt(transaction.fee) * BigInt(2)).toString(),
			// 	transaction,
			// 	this.network
			// );

			let response = await this.rpc.sendTransaction(tx);
			const hash = response.hash;
			console.log(hash, "transaction hash");

			let getTransactionResponse: SorobanRpc.Api.GetTransactionResponse;
			while (true) {
				getTransactionResponse = await this.rpc.getTransaction(hash);
				if (
					getTransactionResponse.status !==
					SorobanRpc.Api.GetTransactionStatus.NOT_FOUND
				) {
					break;
				}
				await new Promise(resolve => setTimeout(resolve, 500));
			}

			return this.decodeReturnValue(getTransactionResponse, hash);
		} catch (error) {
			console.error("Transaction failed:", error);
			throw error;
		}
	}

	private decodeReturnValue(
		response:
			| SorobanRpc.Api.GetSuccessfulTransactionResponse
			| SorobanRpc.Api.GetFailedTransactionResponse,
		hash: string
	): any {
		if (response.status === "SUCCESS") {
			const transactionMeta = response.resultMetaXdr;
			let returnValue = response?.returnValue;
			if (!returnValue)
				returnValue = transactionMeta.v3().sorobanMeta().returnValue();
			console.log(`Transaction result: ${returnValue.value()}`);
			return { hash, result: returnValue.value() };
		} else {
			throw `Transaction failed: ${response?.resultXdr}`;
		}
	}
}

export default ContractClient;
