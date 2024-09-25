/* eslint-disable prettier/prettier */
import { Router } from "express";
import { Routes } from "@/types";
import validate from '@/lib/middlewares/validation.middleware';
import { userSignUpSchema, userSignInSchema } from "../validations";
import AuthController from "../controllers/auth.controller";

class AuthRoute implements Routes {
    public path = "/admin/auth";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/create`,
            validate(userSignUpSchema),
            this.authController.createUser.bind(this.authController)
        );

        this.router.post(
            `${this.path}/login`,
            validate(userSignInSchema),
            this.authController.loginUser.bind(this.authController)
        );

        this.router.get(
            `${this.path}/authenticate`,
            this.authController.getUserByToken.bind(this.authController)
        );
    }
}

export default AuthRoute;
