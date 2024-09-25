import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/transaction.service";

class TransactionController {
	private transactionService = new TransactionService();

	public async createTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const transaction = await this.transactionService.addTransaction(payload);
			res.status(201).json({
				data: transaction,
				message: "Transaction created successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const transaction = await this.transactionService.getTransaction(id);
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

    public async getUserTransaction(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const transaction = await this.transactionService.getUserTransactions(userId);
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async getAllTransactions(req: Request, res: Response, next: NextFunction) {
		try {
			const transaction = await this.transactionService.getAllTransactions();
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async acceptTransactionRequested(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { seller } = req.body;
			const transaction = await this.transactionService.acceptTransactionRequested(id, seller);
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async changeTransactionStatus(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { authority, status } = req.body;
			const transaction = await this.transactionService.changeTransactionStatus(id, status, authority);
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}

	public async changeTransactionStage(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const { authority, stage, status } = req.body;
			const transaction = await this.transactionService.changeTransactionStage(id, stage, authority, status);
			res.status(201).json({
				data: transaction,
				message: "success",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default TransactionController;
