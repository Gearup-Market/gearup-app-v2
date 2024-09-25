import { HttpException } from "@/core/exceptions/HttpException";
import stellarWalletModel from "./models/stellarWallet";
import { isEmpty } from "@/core/utils/isEmpty";
import { UserId } from "@/modules/users/types";
import StellarWalletUtility, {
	createStellarAccount,
	fundWithFriendbot,
	TransactionDetail,
} from "@/lib/stellar/wallet";
import { IWeb3Wallet, WalletWithBalance } from "./types";
import { encrypt } from "@/lib/enc";
import userModel from "../users/models/users";
import { StrKey } from "@stellar/stellar-sdk";
import { stellarExplorer } from "@/lib/stellar/sdk";
import { Wallet } from "../wallet/types";
import { Types } from "mongoose";

class StellarWalletService {
	private wallet = stellarWalletModel;
	private user = userModel;

	private StellarUtil = new StellarWalletUtility({
		adminSecretKey: process.env.ADMIN_STELLAR_SECRET,
		model: stellarWalletModel,
	});

	public async createWallet(userId: UserId, password: string): Promise<any> {
		try {
			if (isEmpty(userId) || isEmpty(password))
				throw new HttpException(400, "UserId and password is required!");
			const account = await this.wallet.findOne({ userId }).lean();
			if (account) return account;
			const { publicKey, secret } = createStellarAccount();
			const encryptedKey = encrypt(secret, password);
			const _stellar = await this.wallet.create({
				userId,
				publicKey,
				encryptedKey,
				password,
			});
			fundWithFriendbot(publicKey);
			this.user.findOneAndUpdate({ userId }, { stellarWallet: _stellar._id });
			return _stellar.toJSON();
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async createAndSaveWallet(userId: UserId, password: string): Promise<any> {
		try {
			if (isEmpty(userId) || isEmpty(password))
				throw new HttpException(400, "UserId and password is required!");
			const account = await this.wallet.findOne({ userId }).lean();
			if (account) return account;
			const { publicKey, encryptedKey } =
				await this.StellarUtil.createStellarWallet(password);
			const _stellar = await this.wallet.create({
				userId,
				publicKey,
				encryptedKey,
				password,
			});
			this.user.findOneAndUpdate({ userId }, { stellarWallet: _stellar._id });
			return _stellar.toJSON();
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async findWallet(userId: UserId): Promise<WalletWithBalance> {
		try {
			const wallet = await this.wallet.findOne({ userId }).lean();
			if (!wallet) throw new HttpException(404, "Wallet not found for user");
			const balances = await this.StellarUtil.getBalances(wallet.publicKey);
			return { ...wallet, ...balances };
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async updateWallet(userId: UserId) {
		try {
			const wallet = await this.wallet.findOne({ userId })
			if (!wallet) throw new HttpException(404, "Wallet not found for user");
			
			// wallet.userId = new Types.ObjectId(userId);
			// await wallet.save()

			return wallet
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async transferXLM(
		userId: UserId,
		recipientPublicKey: string,
		amountInXLM: string
	): Promise<{hash: string; link: string}> {
		try {
			if (!StrKey.isValidEd25519PublicKey(recipientPublicKey))
				throw new HttpException(400, "invalid recipeint public key");
			const response = await this.StellarUtil.sendXLMPayment(
				userId,
				recipientPublicKey,
				amountInXLM
			);
			return {
				hash: response.hash,
				link: `${stellarExplorer}/txns/${response.hash}`
			};
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async setWalletAsMaster(userId: UserId): Promise<IWeb3Wallet> {
		try {
			const wallet = await this.wallet.findOne({ userId });
			if (!wallet) throw new HttpException(404, "Wallet not found for user");

			wallet.isMaster = true;
			await wallet.save();
			return { ...(wallet.toJSON() as IWeb3Wallet), isMaster: true };
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async findWalletById(walletId: string): Promise<IWeb3Wallet> {
		try {
			const wallet = await this.wallet.findById(walletId).lean();
			return wallet;
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async findWallets(): Promise<IWeb3Wallet[]> {
		try {
			const wallets = await this.wallet.find().lean();
			return wallets;
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async fetchWalletTransactions({
		userId,
		limit = 10,
		cursor,
	}: {
		userId: string;
		limit?: number;
		cursor?: string;
	}): Promise<{
		transactions: TransactionDetail[];
		nextCursor?: string;
	}> {
		try {
			const wallet = await this.wallet.findOne({ userId }).lean();
			if (!wallet) throw new HttpException(404, "Wallet not found for user");
			const transactions = await this.StellarUtil.getTransactions(
				wallet.publicKey,
				limit,
				cursor
			);
			return transactions;
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}

	public async deleteWallet(userId: UserId) {
		try {
			const wallet = await this.wallet.findOne({ userId });
			if (wallet) wallet.delete();
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}
}

export default StellarWalletService;
