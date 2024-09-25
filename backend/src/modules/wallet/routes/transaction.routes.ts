/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import { validationMiddleware } from "@/lib";
import { getAllTransactionsSchema, getTransactionByIdSchema, getUserTransactionsSchema } from "../validations";
import TransactionController from "../controllers/walletTransaction.controller";

class TransactionRoute implements Routes {
	public path = "/wallet/transactions";
	public router = Router();
	public transactionController = new TransactionController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/all`, validationMiddleware(getAllTransactionsSchema), this.transactionController.getTransactions.bind(this.transactionController));
		this.router.get(`${this.path}/:userId`, validationMiddleware(getUserTransactionsSchema), this.transactionController.getUserTransactions.bind(this.transactionController));
		this.router.get(`${this.path}/:txId`, validationMiddleware(getTransactionByIdSchema), this.transactionController.getTransactionById.bind(this.transactionController));
	}
}

export default TransactionRoute;
