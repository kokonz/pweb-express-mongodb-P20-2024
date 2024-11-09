import { Router } from "express";

export const authRouter = Router();

import { Register, Login } from "../controllers/auth.controller";

authRouter.post("/register", Register);
authRouter.post("/login", Login);