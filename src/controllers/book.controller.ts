import mongoose, { Schema, Document } from "mongoose";

interface Rating {
  average: number;
  count: number;
}

export interface BookDocument extends Document {
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  rating: Rating;
  tags: string[];
  initialQty: number;
  qty: number;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: { type: String },
  publisher: { type: String },
  description: { type: String },
  coverImage: { type: String },
  rating: {
    average: { type: Number },
    count: { type: Number },
  },
  tags: { type: [String] },
  initialQty: { type: Number, default: 1 },
  qty: { type: Number, default: 1 },
});

const Book = mongoose.model<BookDocument>("Book", BookSchema);
export default Book;
