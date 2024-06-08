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
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

export const productsRouter = express.Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", isAdminMiddleware, createProductSchema, createProduct);
productsRouter.get("/:id", productMiddleware, getProduct);
productsRouter.patch(
  "/:id",
  isAdminMiddleware,
  productMiddleware,
  updateProductSchema,
  updateProduct
);
productsRouter.delete(
  "/:id",
  isAdminMiddleware,
  productMiddleware,
  deleteProduct
);
