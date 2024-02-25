import { Request, Response } from "express";
import Product from "../models/Product";
import { matchedData, validationResult } from "express-validator";
import { ProductRequest } from "../middlewares/ProductMiddleware";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().lean(); // Use lean() for a lightweight, plain JavaScript object

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(422).json({ errors: errorMessages });
    }

    const data = matchedData(req);

    const { name, price, image } = data;

    const newProduct = new Product({
      name,
      price,
      image,
    });

    const createdProduct = await newProduct.save();

    return res.json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req: ProductRequest, res: Response) => {
  const { product } = req;
  return res.status(200).json(product);
};

const updateProduct = async (req: ProductRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { body, product } = req;

  const updatedProduct = await Product.findOneAndUpdate(
    product,
    { $set: body },
    { new: true }
  );

  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req: ProductRequest, res: Response) => {
  const { product } = req;
  const deletedProduct = await Product.findOneAndDelete(product);
  return res.status(200).json(deletedProduct);
};

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
