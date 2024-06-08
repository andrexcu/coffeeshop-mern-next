import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { productType } from "../types/productType";

export interface ProductRequest extends Request {
  product?: productType;
}

export const productMiddleware = async (
  req: ProductRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    req.product = product;

    next();
  } catch (error) {
    console.error("Error checking product existence:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
