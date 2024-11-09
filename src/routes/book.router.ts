import { Router } from "express";

export const bookRouter = Router();

import { addBook, getAllBooks, getBookByID, deleteBookByID, updateBookByID } from "../controllers/book.controller";

bookRouter.post("/", addBook);
bookRouter.get("/",  getAllBooks);
bookRouter.get("/:id",  getBookByID);
bookRouter.delete("/:id", deleteBookByID);
bookRouter.patch("/:id", updateBookByID);