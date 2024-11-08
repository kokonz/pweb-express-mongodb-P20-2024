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
        status: 400,
        message: "Email already in use",
      });
      return;
    }

    // Await the hashed password
    password = await HashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
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
        // 400 Code means Bad Request
        status: 400,
        message: "User has not Registered yet",
      });
      return;
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      isUserAlreadyExist.password
    );
    if (!isPasswordMatched) {
      res.status(400).json({
        // 400 Code means Bad Request
        status: 400,
        message: "Wrong Password",
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

    // send the response
    res.status(200).json({
      status: 200,
      success: true,
      message: "login success",
      token: token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
};