import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { HashPassword } from "../services/auth.service";
import bcrypt from "bcrypt";

export const Register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    var { username, email, password } = user;

    const isEmailAlreadyExist = await User.findOne({
      email: email,
    });
    if (isEmailAlreadyExist) {
      res.status(400).json({
        status: "error",
        message: "User already registered",
      });
      return;
    }

    password = await HashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({ 
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    var { username, password } = user;

    const isUserAlreadyExist = await User.findOne({
      username: username,
    });
    if (!isUserAlreadyExist) {
      res.status(400).json({
        status: "error",
        message: "User not registered",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserAlreadyExist.password
    );
    if (!isPasswordMatched) {
      res.status(400).json({
        status: "error",
        message: "Invalid credentials",
      });
      return;
    }
    const token = jwt.sign(
      { _id: isUserAlreadyExist?._id, email: isUserAlreadyExist?.email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    isUserAlreadyExist.tokens.push({ token });
    await isUserAlreadyExist.save();

    res.status(200).json({
      status: "success",
      message: "Login success",
      data: {
        user: {
          username: isUserAlreadyExist.username,
          email: isUserAlreadyExist.email
        },
        token: token
      }
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
};