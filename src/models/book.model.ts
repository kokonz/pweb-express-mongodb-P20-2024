import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
} from "../controllers/book.controller";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// Route untuk membuat buku baru
router.post("/", authenticateToken, createBook);

// Route untuk mendapatkan semua buku
router.get("/", authenticateToken, getBooks);

// Route untuk mendapatkan detail buku berdasarkan ID
router.get("/:id", authenticateToken, getBookById);

// Route untuk memperbarui buku berdasarkan ID
router.patch("/:id", authenticateToken, updateBook);

// Route untuk menghapus buku berdasarkan ID
router.delete("/:id", authenticateToken, deleteBook);

// Route untuk meminjam buku berdasarkan ID
router.post("/borrow/:id", authenticateToken, borrowBook);

export default router;
