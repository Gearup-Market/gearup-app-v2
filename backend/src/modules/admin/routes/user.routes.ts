/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import UserController from "../controllers/user.controller";
import adminMiddleware from "@/lib/middlewares/admin.middleware";

class UserRoute implements Routes {
	public path = "/admin";
	public router = Router();
	public userController = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/all`, this.userController.findUsers.bind(this.userController));
		this.router.get(`${this.path}/:userId`, adminMiddleware, this.userController.findUser.bind(this.userController));
		this.router.post(`${this.path}/update`, adminMiddleware, this.userController.updateUser.bind(this.userController));
		this.router.delete(`${this.path}/:userId`, this.userController.deleteUser.bind(this.userController));
	}
}

export default UserRoute;
