import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
	private userService = new UserService();

	public async findUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const user = await this.userService.findUser(userId);
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async findUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await this.userService.findUsers();
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async registerKyc(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const kyc = await this.userService.registerKyc(payload);
			res.json({ data: kyc, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async sendPhoneOtpForKyc(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, phoneNumber } = req.body;
			await this.userService.sendOtp(userId, phoneNumber);
			res.json({ data: {}, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

    public async validatePhoneNumberForKyc(req: Request, res: Response, next: NextFunction) {
		try {
			const { code, userId } = req.body;
			await this.userService.validatePhoneNumberForKyc(code, userId);
			res.json({ data: {}, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async saveAccountDetails(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const user = await this.userService.saveAccountDetails(payload);
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const user = await this.userService.updateUser(payload);
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
