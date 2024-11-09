import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { LibraryUser } from '../models/user.model';

interface ITokenPayload {
    userId: string;
    username: string;
}

export const validateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.headers.authorization?.split(' ')[1];

        if (!authToken) {
            return res.status(401).json({
                status: 'failed',
                message: 'Authentication token missing',
                data: {}
            });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT secret key not configured');
        }

        const decodedToken = jwt.verify(authToken, secretKey) as ITokenPayload;

        const activeUser = await LibraryUser.findOne({
            _id: decodedToken.userId,
            'activeSessions.tokenString': authToken
        });

        if (!activeUser) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid or expired session',
                data: {}
            });
        }

        (req as any).currentUser = activeUser;
        (req as any).currentToken = authToken;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid authentication token',
                data: {}
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Authentication system error',
            data: {}
        });
    }
};