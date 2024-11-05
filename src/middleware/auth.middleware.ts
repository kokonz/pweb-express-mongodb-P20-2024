import express, { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.is("application/json")) {
    express.json()(req, res, next);
  } else {
    res.status(400).json({ message: "Content-Type must be application/json" });
  }
};

export default authMiddleware;