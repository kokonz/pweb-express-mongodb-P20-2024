import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    initialQty: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Books", BookSchema);