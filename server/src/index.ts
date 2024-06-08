import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.ENV || 5000;

mongoose.connect(process.env.DATABASE_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
