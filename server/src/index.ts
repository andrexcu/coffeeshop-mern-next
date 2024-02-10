import express, { Request, Response, response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { productRouter } from "./routes/productRoute";

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", productRouter);

mongoose.connect(process.env.DATABASE_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
