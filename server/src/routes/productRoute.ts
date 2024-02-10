import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";
import { checkSchema } from "express-validator";
import { productValidationSchema } from "../validation/ProductSchema";
import { productMiddleware } from "../middlewares/ProductMiddleware";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/", checkSchema(productValidationSchema), createProduct);
// productRouter.post("/:id", updateProduct);
productRouter.get("/:id", productMiddleware, getProduct);
productRouter.patch("/:id", productMiddleware, updateProduct);
productRouter.delete("/:id", productMiddleware, deleteProduct);
