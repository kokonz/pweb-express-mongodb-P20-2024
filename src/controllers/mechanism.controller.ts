import { Request, Response } from "express";
import { Book } from "../models/book.model";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const bookID = req.params.id;

    const data = await Book.findById(bookID);

    if (!data) {
      res.status(400).json({
        status: "error",
        message: `Book with id: ${bookID} not found`,
      });
      return;
    }

    if (data.qty <= 1) {
      res.status(400).json({
        status: "error",
        message: `Book with id: ${bookID} has no amount left`,
      });
      return;
    }

    const bookQty = data.qty - 1;

    const updatedBook = await Book.findByIdAndUpdate(
      bookID,
      { qty: bookQty },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Successfully borrow book",
      data: {
        currentQty: bookQty,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      status: "error",
      message: `Invalid book id: ${req.params.id}`,
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
    try {
      const bookID = req.params.id;
  
      const data = await Book.findById(bookID);
  
      if (!data) {
        res.status(400).json({
          status: "error",
          message: `Book with id: ${bookID} not found`,
        });
        return;
      }
  
      if (data.qty >= data.initialQty) {
        res.status(400).json({
          status: "error",
          message: `Book with id: ${bookID} is already on maximum Quantity`,
        });
        return;
      }
  
      const bookQty = data.qty + 1;
  
      const updatedBook = await Book.findByIdAndUpdate(
        bookID,
        { qty: bookQty },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        status: "success",
        message: "Successfully return book",
        data: {
          currentQty: bookQty,
        },
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({
        status: "error",
        message: `Invalid book id: ${req.params.id}`,
      });
    }
  };