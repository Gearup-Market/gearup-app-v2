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

            res.status(200).json({ data: user, message: 'Admin retrieved successfully' });
        } catch (error) {
            next(error);
        }

    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { password, userName , role} = req.body;
            const newUser = await this.authService.createUser(userName, password, role);
            res.status(201).json({ data: newUser, message: 'Admin created' });
        } catch (error) {
            next(error);
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userName, password } = req.body;
            const { token, user } = await this.authService.loginUser(userName, password);
            res.status(200).json({ data: { token, user }, message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
