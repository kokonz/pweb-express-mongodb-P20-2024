import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const { title, author, publishedDate, publisher, description, coverImage, tags, initialQty, qty } = book;
    const rating = book.rating || { average: 0, count: 0 };

    const bookExists = await Book.findOne({
      title: title,
    });
    if (bookExists) {
      res.status(400).json({
        status: "error",
        message: "Book already exists",
      });
      return;
    }

    if (initialQty <= 0 || qty <= 0) {
      res.status(400).json({
        status: "error",
        message: "Initial Qty and Qty should not be 0 or less",
      });
      return;
    }

    if (qty > initialQty) {
      res.status(400).json({
        status: "error",
        message: "Qty should not be more than Initial Qty",
      });
      return;
    }

    const newBook = await Book.create({
      rating,
      title,
      author,
      publishedDate,
      publisher,
      description,
      coverImage,
      tags,
      initialQty,
      qty,
    });

    res.status(201).json({
      status: "success",
      message: "Book added successfully",
      data: {
        book: newBook,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const data = await Book.find();
    res.status(201).json({
      status: "success",
      message: "Successfully get all books",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message.toString(),
    });
  }
}

export const getBookByID = async (req: Request, res: Response) => {
  try {
    const data = await Book.findById(req.params.id);

    const bookExists = await Book.findOne({
      _id: req.params.id,
    });

    if(!bookExists) {
      res.status(400).json({
        status: "error",
        message: `Book with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(201).json({
      status: "success",
      message: "Successfully get book",
      data,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid book id: ${req.params.id}`,
    });
  }
}

export const deleteBookByID = async (req: Request, res: Response) => {
  try {
    const data = await Book.findById(req.params.id);

    const deleteBook = await Book.findByIdAndDelete({
      _id: req.params.id,
    });

    if(!deleteBook) {
      res.status(404).json({
        status: "error",
        message: `Book with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(201).json({
      status: "success",
      message: "Successfully remove book",
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid book id: ${req.params.id}`,
    });
  }
}

export const updateBookByID = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.id;
    const updateFields = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookID,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      res.status(400).json({
        status: "error",
        message: `Book with id: ${req.params.id} not found`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid book id: ${req.params.id}`,
    });
  }
};