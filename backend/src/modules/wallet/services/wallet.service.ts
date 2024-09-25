/* eslint-disable prettier/prettier */
import { HttpException } from "@/core/exceptions/HttpException";
import walletModel from "../models/wallet";
import { logger } from "@/core/utils/logger";
import {
	BankAccount,
	PaymentMethod,
	WTransactionStatus,
	WTransactionType,
	WalletStatus,
} from "../types";
import { isEmpty } from "@/core/utils";
import WalletTransactionService from "./walletTransaction.service";
import userModel from "@/modules/users/models/users";

class WalletService {
	private user = userModel;
	private wallet = walletModel;
	private wTransactionService = new WalletTransactionService();

	public async getUserWallet(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			const wallet = await this.wallet.findOne({ userId }).lean().exec();
			return wallet;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getWalletById(walletId: string) {
		try {
			if (isEmpty(walletId)) throw new HttpException(400, "walletId is required");
			const wallet = await this.wallet.findById(walletId).lean().exec();
			return wallet;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async createWallet(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			let wallet = await this.wallet.findOne({ userId }).lean().exec();
			if (wallet) return wallet;
			wallet = (
				await this.wallet.create({
					userId,
				})
			).toJSON();
			this.user.findOneAndUpdate({ userId }, { wallet: wallet._id });
			return wallet;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async saveAccountDetails(payload: BankAccount) {
		try {
			if (isEmpty(payload) || isEmpty(payload.userId))
				throw new HttpException(400, "UserId is required");
			const walletModel = await this.wallet.findOne({ userId: payload.userId });
			const wallet = walletModel.toJSON();
			if (!wallet) throw new HttpException(400, "No wallet found for user");

			walletModel.accountName = payload.accountName;
			walletModel.accountNumber = payload.accountNumber;
			walletModel.bankName = payload.bankName;

			await walletModel.save();
			return { ...wallet, ...payload };
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async creditWallet({
		userId,
		amount,
		description,
		reference,
		method,
	}: {
		userId: string;
		amount: number;
		description: string;
		reference?: string;
		method: PaymentMethod;
	}) {
		try {
			const walletModel = await this.wallet.findOne({ userId });
			const wallet = walletModel.toJSON();
			if (!wallet || wallet.status !== WalletStatus.Active)
				throw new HttpException(404, "No active wallet found");

			walletModel.balance += amount;
			await walletModel.save();
			this.wTransactionService.addTransaction({
				userId,
				amount,
				description,
				reference,
				type: WTransactionType.Credit,
				status: WTransactionStatus.Completed,
				method,
			});
			return walletModel.toJSON();
		} catch (error) {
			logger.error(`Error crediting wallet: ${error.message}`);
			throw new HttpException(500, error.message);
		}
	}

	public async lockFunds(userId: string, amount: number, isDebit: boolean = true) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			const walletModel = await this.wallet.findOne({ userId });
			const wallet = walletModel.toJSON();

			if (!wallet || wallet.status !== WalletStatus.Active)
				throw new HttpException(404, "No active wallet found");
			if (wallet.balance < amount)
				throw new HttpException(400, "Insufficient funds in wallet");

			if (isDebit) {
				if (wallet.balance < wallet.pendingDebit + amount)
					throw new HttpException(
						400,
						"Cannot escrow more than available funds in wallet"
					);
				walletModel.pendingDebit += amount;
			} else {
				walletModel.pendingCredit += amount;
			}

			walletModel.updatedAt = new Date();
			await walletModel.save();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	// use this to unlock and charge the user
	public async finalizeCharge(userId: string, amount: number) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			const walletModel = await this.wallet.findOne({ userId });
			const wallet = walletModel.toJSON();

			if (!wallet || wallet.status !== WalletStatus.Active)
				throw new HttpException(404, "No active wallet found");
			if (wallet.pendingDebit >= amount){
				walletModel.pendingDebit -= amount;
				walletModel.balance -= amount;
			}
			walletModel.updatedAt = new Date();
			await walletModel.save();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getEscrowedBalance(userId: string) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			const wallet = await this.wallet.findOne({ userId }).lean();
			if(!wallet) throw new HttpException(404, "Wallet not found for user");
			return {
				lockedDebitAmount: wallet.pendingDebit,
				lockedCreditAmount: wallet.pendingCredit,
				totalReclaimableBalance: wallet.pendingCredit,
				availableBalance: wallet.balance - wallet.pendingDebit
			}
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async releaseFunds(
		userId: string,
		amount: number,
		isDebit: boolean = true,
		isReversed: boolean = false
	) {
		try {
			if (isEmpty(userId)) throw new HttpException(400, "UserId is required");
			const walletModel = await this.wallet.findOne({ userId });
			const wallet = walletModel.toJSON();

			if (!wallet || wallet.status !== WalletStatus.Active)
				throw new HttpException(404, "No active wallet found");
			if (wallet.balance < amount)
				throw new HttpException(400, "Insufficient funds in wallet");

			if (isDebit) {
				walletModel.pendingDebit = Math.max(wallet.pendingDebit - amount, 0);
				if (isReversed) walletModel.balance += amount;
				else walletModel.balance -= amount;
			} else {
				walletModel.pendingCredit = Math.max(wallet.pendingCredit - amount, 0);
				walletModel.balance += amount;
			}

			walletModel.updatedAt = new Date();
			await walletModel.save();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async debitWallet({
		userId,
		amount,
		description,
		reference,
		method,
	}: {
		userId: string;
		amount: number;
		description: string;
		reference?: string;
		method: PaymentMethod;
	}) {
		try {
			const walletModel = await this.wallet.findOne({ userId });
			const wallet = walletModel.toJSON();
			if (!wallet || wallet.status !== WalletStatus.Active)
				throw new HttpException(404, "No active wallet found");

			if (wallet.balance - wallet.pendingDebit < amount)
				throw new HttpException(400, "Insufficient balance");

			walletModel.balance -= amount;
			await walletModel.save();
			this.wTransactionService.addTransaction({
				userId,
				amount,
				description,
				type: WTransactionType.Debit,
				status: WTransactionStatus.Completed,
				reference,
				method,
			});
			return walletModel.toJSON();
		} catch (error) {
			logger.error(`Error debiting wallet: ${error.message}`);
			throw new HttpException(500, error.message);
		}
	}
}

export default WalletService;
