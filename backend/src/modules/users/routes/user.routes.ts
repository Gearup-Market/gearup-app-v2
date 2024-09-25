/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import UserController from "../controllers/user.controller";
import { validationMiddleware } from "@/lib";
import { registerKycSchema, resendKycOtpSchema, updateKycSchema, updateWalletSchema, validateKycOtpSchema } from "../validations/user";

class UserRoute implements Routes {
	public path = "/users";
	public router = Router();
	public userController = new UserController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Get all users
		this.router.get(`${this.path}/all`, this.userController.findUsers.bind(this.userController));
		// Get a single user by userId
		this.router.get(`${this.path}/:userId`, this.userController.findUser.bind(this.userController));
		this.router.post(`${this.path}/kyc/register`, validationMiddleware(registerKycSchema), this.userController.registerKyc.bind(this.userController));
		this.router.post(`${this.path}/kyc/update`, validationMiddleware(updateKycSchema), this.userController.registerKyc.bind(this.userController));
		this.router.post(`${this.path}/kyc/resend-otp`, validationMiddleware(resendKycOtpSchema), this.userController.sendPhoneOtpForKyc.bind(this.userController));
        this.router.post(`${this.path}/kyc/validate-otp`, validationMiddleware(validateKycOtpSchema), this.userController.validatePhoneNumberForKyc.bind(this.userController));
		this.router.post(`${this.path}/save-bank-details`, validationMiddleware(updateWalletSchema), this.userController.saveAccountDetails.bind(this.userController));
		this.router.post(`${this.path}/update`, this.userController.updateUser.bind(this.userController));
	}
}

export default UserRoute;
