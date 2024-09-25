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

	public async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			const user = await this.userService.updateUser(payload);
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const user = await this.userService.deleteUser(userId);
			res.json({ data: user, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;
