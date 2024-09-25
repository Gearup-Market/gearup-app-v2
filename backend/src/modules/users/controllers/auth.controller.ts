/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { logger } from '@/core/utils/logger';
import { HttpException } from '@/core/exceptions/HttpException';
import AuthService from '../services/auth.service';

class AuthController {
    private authService = new AuthService();

    public async getUserByToken(req: Request, res: Response, next: NextFunction) {

        try {
            const { authorization } = req.headers;
            if (!authorization) {
                throw new HttpException(401, 'Authorization token is required');
            }

            const token = authorization.split(' ')[1];
            const user = await this.authService.getUserByToken(token);

            res.status(200).json({ data: user, message: 'User retrieved successfully' });
        } catch (error) {
            next(error);
        }

    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, userName } = req.body;
            const newUser = await this.authService.createUser(userName, email, password);
            logger.info("create user endpoint")
            res.status(201).json({ data: newUser, message: 'User created' });
        } catch (error) {
            next(error);
        }
    }


    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.authService.loginUser(email, password);
            res.status(200).json({ data: { token, user }, message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }


    public async verifyUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            //logger.info(token)
            const user = await this.authService.verifyUser(token);
            res.status(200).json({ data: user, message: 'Account verified successfully' });
        } catch (error) {
            next(error);
        }
    }

    public async sendResetPasswordEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            logger.info(email)
            await this.authService.sendResetPasswordEmail(email);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            next(error);
        }
    }

    public async verifyResetToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token } = req.body;
            await this.authService.verifyResetToken(email, token);
            res.status(200).json({ message: 'Token verified' });
        } catch (error) {
            next(error);
        }
    }


    public async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token, newPassword } = req.body;
            await this.authService.resetPassword(email, token, newPassword);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
