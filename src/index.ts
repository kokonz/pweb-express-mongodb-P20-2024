import { connectToDatabase } from "./db-connection";
import express from "express";
import { authRouter } from "./routes/auth.router";
import { Verification } from "./middleware/auth";
const app = express();

app.use(express.json());

// check endpoint
app.get("/", (_, response) => {
  response.status(200).send("Server is up and running 💫");
});


app.use("/auth", authRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});

connectToDatabase();