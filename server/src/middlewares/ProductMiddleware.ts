import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
// Define a custom interface that extends the Request type
export interface ProductRequest extends Request {
  product?: any; // Replace 'any' with the actual type of your product model
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
