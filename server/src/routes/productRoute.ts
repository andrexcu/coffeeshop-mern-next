import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";
import { checkSchema } from "express-validator";
import {
  createProductValidationSchema,
  updateProductSchema,
} from "../validation/ProductSchema";
import { productMiddleware } from "../middlewares/ProductMiddleware";

export const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post(
  "/",
  checkSchema(createProductValidationSchema),
  createProduct
);
// productRouter.post("/:id", updateProduct);
productRouter.get("/:id", productMiddleware, getProduct);
productRouter.patch(
  "/:id",
  productMiddleware,
  updateProductSchema,
  updateProduct
);
productRouter.delete("/:id", productMiddleware, deleteProduct);
