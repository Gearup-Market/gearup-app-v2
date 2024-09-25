import { Router } from "express";
import { Routes } from "@/types";
import TransactionController from "../controllers/transaction.controller";
import { validationMiddleware } from "@/lib";
import { changeTransactionStageSchema, changeTransactionStatusSchema, createTransactionSchema, getTransactionSchema, getUserTransactionSchema } from "../validations";

class TransactionRoute implements Routes {
	public path = "/transactions";
	public router = Router();
	public transactionController = new TransactionController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			`${this.path}/create`,
            validationMiddleware(createTransactionSchema),
			this.transactionController.createTransaction.bind(this.transactionController)
		);

        this.router.get(
			`${this.path}/byUser/:userId`,
            validationMiddleware(getUserTransactionSchema),
			this.transactionController.getUserTransaction.bind(this.transactionController)
		);

		this.router.get(
			`${this.path}/all`,
			this.transactionController.getAllTransactions.bind(this.transactionController)
		);

        this.router.get(
			`${this.path}/:id`,
            validationMiddleware(getTransactionSchema),
			this.transactionController.getTransaction.bind(this.transactionController)
		);

		this.router.post(
			`${this.path}/update-status/:id`,
            validationMiddleware(changeTransactionStatusSchema),
			this.transactionController.changeTransactionStatus.bind(this.transactionController)
		);

		this.router.post(
			`${this.path}/update-stage/:id`,
            validationMiddleware(changeTransactionStageSchema),
			this.transactionController.changeTransactionStage.bind(this.transactionController)
		);
    }
}

export default TransactionRoute