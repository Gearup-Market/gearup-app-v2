/* eslint-disable prettier/prettier */
import { HttpException } from "@/core/exceptions/HttpException";
import wTransactionModel from "../models/walletTransactions";
import { WTransaction } from "../types";
import { isEmpty } from "@/core/utils";

class WalletTransactionService {
	private transaction = wTransactionModel;

	public async getTransactions(limit: number = 10, skip: number = 0) {
		try {
			const transactions = await this.transaction
				.find()
				.limit(limit)
				.skip(skip)
				.lean()
				.exec();
			return transactions;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getUserTransactions(
		userId: string,
		limit: number = 10,
		skip: number = 0
	) {
		try {
			if (!userId) throw new HttpException(400, "UserId is required");
			const transactions = await this.transaction
				.find({ userId })
				.limit(limit)
				.skip(skip)
				.lean()
				.exec();
			return {
				transactions,
				pagination: {
					currentPage: (skip / limit) + 1,
					totalCount: await this.transaction.count()
				}
			};
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getTransactionById(txId: string) {
		try {
			if (!txId) throw new HttpException(400, "txId is required");
			const transaction = await this.transaction.findById(txId).lean().exec();
			return transaction;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async getTransactionByRef(paymentReference: string) {
		try {
			if (!paymentReference) throw new HttpException(400, "payment reference is required");
			const transaction = await this.transaction.findOne({reference: paymentReference}).lean()
			return transaction;
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async addTransaction(payload: Omit<WTransaction, "_id">) {
		try {
			if (isEmpty(payload))
				throw new HttpException(400, "Request payload is empty");
			if (isEmpty(payload.userId))
				throw new HttpException(400, "UserId is required");
			const transaction = await this.transaction.create(payload);
			return transaction.toJSON();
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}

	public async removeTransaction(id: string) {
		try {
			if (isEmpty(id))
				throw new HttpException(400, "Request payload is empty");
	
			const transaction = await this.transaction.deleteOne({_id: id});
			return transaction
		} catch (error) {
			throw new HttpException(500, error.message);
		}
	}
}

export default WalletTransactionService;
