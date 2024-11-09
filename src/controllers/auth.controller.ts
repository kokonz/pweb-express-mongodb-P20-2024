import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LibraryUser } from '../models/user.model';
import { encryptUserPassword } from '../services/auth.service';

export const createNewLibraryAccount = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'Missing required fields',
                data: {}
            });
        }

        const emailExists = await LibraryUser.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                status: 'failed',
                message: 'This email is already registered',
                data: {}
            });
        }

        const hashedPassword = await encryptUserPassword(password);
        const newUser = await LibraryUser.create({
            username,
            email,
            password: hashedPassword,
            activeSessions: []
        });

        return res.status(201).json({
            status: 'success',
            message: 'Library account created successfully',
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Failed to create library account',
            data: {}
        });
    }
};

export const authenticateLibraryUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: 'failed',
                message: 'Username and password are required',
                data: {}
            });
        }

        const user = await LibraryUser.findOne({ username });
        if (!user) {
            return res.status(400).json({
                status: 'failed',
                message: 'Account not found',
                data: {}
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid credentials',
                data: {}
            });
        }

        const secretKey = process.env.SECRET_KEY;
        if (!secretKey) {
            throw new Error('JWT secret key not configured');
        }

        const sessionToken = jwt.sign(
            { 
                userId: user._id.toString(),
                username: user.username
            },
            secretKey,
            { expiresIn: '24h' }
        );

        user.activeSessions.push({ 
            tokenString: sessionToken,
            createdAt: new Date()
        });
        user.lastLogin = new Date();
        await user.save();

        return res.status(200).json({
            status: 'success',
            message: 'Authentication successful',
            data: {
                sessionToken,
                userDetails: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    lastLogin: user.lastLogin
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Authentication system error',
            data: {}
        });
    }
};