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

const getCartQuantity = async (req: Request, res: Response) => {
  const user = req.user as UserWithId;

  try {
    if (!user) {
      return res.json("no user found!");
    }

    const cart = await Cart.findOne({ userId: user.id })
      .populate("cartItem")
      .exec();

    if (!cart || !cart.cartItem) {
      return res.json(0);
    }

    // Calculate the total quantity
    const totalQuantity = cart.cartItem.reduce(
      (total, item: any) => total + item.quantity,
      0
    );

    if (!totalQuantity) {
      return res.json("no order yet.");
    }
    // Return the total quantity
    return res.status(200).json(totalQuantity);
  } catch (error) {
    console.error("Error fetching cart item", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCart, createCart, getCartQuantity };
