import express, { Request, Response, RequestHandler } from "express";
import User from "../model/auth.model";
import connectDB from "../db/conn";
import bcrypt from "bcrypt";

const authRouter = express.Router();

const registerHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  let { username, password, email } = req.body;

  password = await bcrypt.hash(password, 5);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ 
        status: "error",
        message: "User already registered" 
      });
      return;
    }

    const newUser = new User({ username, password, email });
    await newUser.save();

    const createdUser = await User.findOne({ username });

    res.status(201).json({ 
      status: "success",
      message: "User registered successfully",
      data: {
        id: createdUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

const loginHandler: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(401).json({ 
        status: "error",
        message: "User not registered" 
      });
      return;
    }

    let isMatch = await bcrypt.compare(password, existingUser.password);

    if(isMatch) {
      res.status(201).json({ 
        status: "success",
        message: "Login success",
        data: {
          user: {
            id: existingUser.username,
            email: existingUser.email
          }
        }
      });
    }
    else {
      res.status(401).json({ 
        status: "error",
        message: "Invalid credentials"
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);

export default authRouter;
