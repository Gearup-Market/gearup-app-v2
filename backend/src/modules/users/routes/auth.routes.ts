/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import validate from '@/lib/middlewares/validation.middleware';
import { userSignUpSchema, userSignInSchema, resetPasswordRequestSchema, resetPasswordVerifySchema, resetPasswordSchema } from "../validations";
import AuthController from "../controllers/auth.controller";

class AuthRoute implements Routes {
    public path = "/auth";
    public router: Router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Create a new user
        this.router.post(
            `${this.path}/create`,
            validate(userSignUpSchema),
            this.authController.createUser.bind(this.authController)
        );

        // Login user
        this.router.post(
            `${this.path}/login`,
            validate(userSignInSchema),
            this.authController.loginUser.bind(this.authController)
        );

        // Verify user by token
        this.router.get(
            `${this.path}/verify/:token`,
            this.authController.verifyUser.bind(this.authController)
        );

        // Get user details using token (from the Authorization header)
        this.router.get(
            `${this.path}/test/token`,
            this.authController.getUserByToken.bind(this.authController)
        );

        // Request password reset
        this.router.post(
            `${this.path}/reset-password/request`,
            validate(resetPasswordRequestSchema),
            this.authController.sendResetPasswordEmail.bind(this.authController)
        );

        // Verify password reset token
        this.router.post(
            `${this.path}/reset-password/verify`,
            validate(resetPasswordVerifySchema),
            this.authController.verifyResetToken.bind(this.authController)
        );

        // Reset password
        this.router.post(
            `${this.path}/reset-password/reset`,
            validate(resetPasswordSchema),
            this.authController.resetPassword.bind(this.authController)
        );
    }
}

export default AuthRoute;
