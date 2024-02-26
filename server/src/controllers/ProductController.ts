import { Request, Response } from "express";
import Product from "../models/Product";
import { matchedData, validationResult } from "express-validator";
import { ProductRequest } from "../middlewares/ProductMiddleware";

const getProducts = async (req: Request, res: Response) => {
  try {
    const {
      type,
      popular,
      special,
    }: { type?: string; popular?: string; special?: string } = req.query;

    // Create a filter object based on the presence of the parameters
    const filter: any = {};

    if (type) {
      filter.type = type;
    }
    if (popular !== undefined) {
      filter.popular = popular === "true"; // Convert to boolean
    }
    if (special !== undefined) {
      filter.special = special === "true"; // Convert to boolean
    }

    const products = await Product.find(filter).lean();

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

    const { name, price, image, popular, onMenu, special, type } = data;
    console.log("Data from request:", data);
    const newProduct = new Product({
      name,
      price,
      image,
      popular,
      onMenu,
      special,
      type,
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
