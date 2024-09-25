import { NextFunction, Request, Response } from "express";
import StellarWalletService from "./service";
import userModel from "../users/models/users";

class StellarWalletController {
	private user = userModel;
	private stellarWalletService = new StellarWalletService();

	public async createWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, password } = req.body;
			const wallet = await this.stellarWalletService.createWallet(userId, password);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	// public async createTestWallet(req: Request, res: Response, next: NextFunction) {
	// 	try {
	// 		const { userId } = req.params;
	// 		const user = await this.user.findById(userId).lean();
	// 		const wallet = await this.stellarWalletService.createAndSaveWallet(userId, user.password);
	// 		res.json({ data: wallet, message: "success" }).status(200);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }

	public async transferXLM(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, recipientPublicKey, amount } = req.body;
			const response = await this.stellarWalletService.transferXLM(
				userId,
				recipientPublicKey,
				amount
			);
			res.json({ data: response, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async setWalletAsMaster(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.stellarWalletService.setWalletAsMaster(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async findWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.stellarWalletService.findWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async updateWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.stellarWalletService.updateWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async findWallets(req: Request, res: Response, next: NextFunction) {
		try {
			const wallet = await this.stellarWalletService.findWallets();
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async fetchWalletTransactions(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { userId } = req.params;
			const { limit, cursor } = req.query;
			const transactions = await this.stellarWalletService.fetchWalletTransactions({
				userId,
				limit: limit && Number(limit),
				cursor: cursor && cursor.toString(),
			});
			res.json({ data: transactions, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async deleteWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.stellarWalletService.deleteWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default StellarWalletController;
