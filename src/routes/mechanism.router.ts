import { Router } from "express";

export const mechanismRouter = Router();

import { borrowBook, returnBook } from "../controllers/mechanism.controller";

mechanismRouter.post("/borrow/:id", borrowBook);
mechanismRouter.post("/return/:id", returnBook);
