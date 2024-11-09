import { Router } from "express";
import {
  addNewBook,
  fetchAllBooks,
  fetchBookById,
  modifyBook,
  removeBook,
  lendBook,
} from "../controllers/book.controller";
import { verifyToken } from "../middleware/auth";

const bookRouter = Router();

// Endpoint untuk menambahkan buku baru
bookRouter.post("/", verifyToken, addNewBook);

// Endpoint untuk mengambil semua buku
bookRouter.get("/", verifyToken, fetchAllBooks);

// Endpoint untuk mendapatkan rincian buku berdasarkan ID
bookRouter.get("/:id", verifyToken, fetchBookById);

// Endpoint untuk memperbarui informasi buku berdasarkan ID
bookRouter.patch("/:id", verifyToken, modifyBook);

// Endpoint untuk menghapus buku berdasarkan ID
bookRouter.delete("/:id", verifyToken, removeBook);

// Endpoint untuk meminjam buku berdasarkan ID
bookRouter.post("/lend/:id", verifyToken, lendBook);

export default bookRouter;
