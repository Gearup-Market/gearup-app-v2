/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import { validationMiddleware } from "@/lib";
import WalletController from "../controllers/wallet.controller";
import { createOrFindWalletSchema, creditOrDebitWalletSchema, updateWalletSchema } from "../validations";

class WalletRoute implements Routes {
	public path = "/wallets";
	public router: Router = Router();
	public walletController = new WalletController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/:userId`, validationMiddleware(createOrFindWalletSchema), this.walletController.getUserWallet.bind(this.walletController));
		this.router.post(`${this.path}/create/:userId`, validationMiddleware(createOrFindWalletSchema), this.walletController.createWallet.bind(this.walletController));
		this.router.post(`${this.path}/save-bank-details`, validationMiddleware(updateWalletSchema), this.walletController.saveAccountDetails.bind(this.walletController));
		this.router.post(`${this.path}/credit`, validationMiddleware(creditOrDebitWalletSchema), this.walletController.creditWallet.bind(this.walletController));
		this.router.post(`${this.path}/credit-silently`, this.walletController.creditWalletSilently.bind(this.walletController));
		this.router.post(`${this.path}/debit`, validationMiddleware(creditOrDebitWalletSchema), this.walletController.debitWallet.bind(this.walletController));
	}
}

export default WalletRoute;
