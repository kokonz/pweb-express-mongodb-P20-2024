import express from "express";

const bookRoutes = express.Router();

bookRoutes.get("/", (_, res) => {
  res.status(200).json({ message: "Book placeholder" });
});

export default bookRoutes;
