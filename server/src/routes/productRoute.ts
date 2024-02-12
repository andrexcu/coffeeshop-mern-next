import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";
import {
  createProductSchema,
  updateProductSchema,
} from "../validation/ProductSchema";
import { productMiddleware } from "../middlewares/ProductMiddleware";

export const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", createProductSchema, createProduct);
productsRouter.get("/:id", productMiddleware, getProduct);
productsRouter.patch(
  "/:id",
  productMiddleware,
  updateProductSchema,
  updateProduct
);
productsRouter.delete("/:id", productMiddleware, deleteProduct);
