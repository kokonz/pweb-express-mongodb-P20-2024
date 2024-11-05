import express from "express";

const router = express.Router();

router.get("/borrow", (_, res) => {
  res.status(200).send("Borrow placeholder");
});

router.get("/return", (_, res) => {
  res.status(200).send("Return placeholder");
});

export default router;