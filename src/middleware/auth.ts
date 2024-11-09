import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export async function Verification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is required");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Invalid token format");
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("SECRET_KEY is not defined");
    }

    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    next();
  } catch (error) {
    res.status(401).send({
      status: "failed",
      message: error,
      data: {},
    });
  }
}