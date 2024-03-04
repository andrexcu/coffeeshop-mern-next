import { Request, Response } from "express";
import Cart from "../models/Cart";
import { UserWithId } from "./AuthController";

const getCart = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserWithId;

    if (!user) {
      return res.json({ msg: "no logged in user" });
    }

    // console.log(user.id);

    // const cart = await Cart.find().lean();

    const cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      return res.status(404).json({ error: "No cart found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCart = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserWithId;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newCart = await Cart.create({
      userId: user.id,
      cartItem: [], // Initialize with an empty array of cart items
    });

    return res.status(201).json(newCart);
  } catch (error) {
    console.error("Error creating cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCart, createCart };
