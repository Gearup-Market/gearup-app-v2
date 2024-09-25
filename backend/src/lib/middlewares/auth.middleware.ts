/* eslint-disable prettier/prettier */
import { SECRET_KEY } from '@/core/config';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No bearer token provided in Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).userId = (decoded as any).userId;
        (req as any).authToken = token;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
