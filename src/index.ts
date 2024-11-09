import { connectToDatabase } from "./db-connection";
import express from "express";
import { authRouter } from "./routes/auth.router";
import { bookRouter } from "./routes/book.router";
import { Verification } from "./middleware/auth";
const app = express();

app.use(express.json());

app.get("/", (_, response) => {
  const currentDate = new Date().toDateString();
  response.status(200).json({
    status: "success",
    message: "pemweb gacor",
    date: currentDate,
  });
});

app.use("/auth", authRouter);
app.use("/book", bookRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();