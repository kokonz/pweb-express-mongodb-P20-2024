import express from "express";
import router from "./router";
import connectDB from "./db/conn";
import authMiddleware from "./middleware/auth.middleware";

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.get("/", (_, response) => {
  response.status(200).send("Server is up");
});

app.use(authMiddleware);

app.use(router);

app.listen(port, () => {
  console.log(`Express is running on Port ${port}`);
});
