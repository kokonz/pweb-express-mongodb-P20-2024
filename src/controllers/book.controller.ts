import mongoose, { Schema, Document } from "mongoose";

interface BookRating {
  average: number;
  total: number;
}

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear: string;
  publisher: string;
  summary: string;
  coverUrl: string;
  rating: BookRating;
  categories: string[];
  stock: {
    initial: number;
    available: number;
  };
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: String },
  publisher: { type: String },
  summary: { type: String },
  coverUrl: { type: String },
  rating: {
    average: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
  },
  categories: { type: [String], default: [] },
  stock: {
    initial: { type: Number, default: 1 },
    available: { type: Number, default: 1 },
  },
});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
