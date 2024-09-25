import { NextFunction, Request, Response } from "express";
import WalletService from "../services/wallet.service";

class WalletController {
	private walletService = new WalletService();

	public async getUserWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.walletService.getUserWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

    public async createWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.walletService.createWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async saveAccountDetails(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const wallet = await this.walletService.saveAccountDetails(payload);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

    public async creditWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const wallet = await this.walletService.creditWallet(payload);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

    public async debitWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const wallet = await this.walletService.debitWallet(payload);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default WalletController;
