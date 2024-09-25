import { NextFunction, Request, Response } from "express";
import WalletService from "../services/wallet.service";
import WalletTransactionService from "../services/walletTransaction.service";

class WalletTransactionController {
	private transactionService = new WalletTransactionService();

	public async getTransactions(req: Request, res: Response, next: NextFunction) {
		try {
			const { limit, skip } = req.query;
			const transactions = await this.transactionService.getTransactions(+limit, +skip);
			res.json({ data: transactions, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async getUserTransactions(req: Request, res: Response, next: NextFunction) {
		try {
			const {userId} = req.params;
			const { limit, skip } = req.query;
			const transactions = await this.transactionService.getUserTransactions(userId, +limit, +skip);
			res.json({ data: transactions, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async getTransactionById(req: Request, res: Response, next: NextFunction) {
		try {
			const {txId} = req.params;
			const transaction = await this.transactionService.getTransactionById(txId);
			res.json({ data: transaction, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default WalletTransactionController;
