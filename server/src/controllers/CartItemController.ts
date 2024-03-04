import { Request, Response } from "express";
import CartItem from "../models/CartItem";
import Cart from "../models/Cart";
import { UserWithId } from "./AuthController";
import { cartItemType } from "../types/cartItemType";

const getCartItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // console.log(id);
    // return res.json(id);
    const cart = await Cart.findOne({ _id: id }).populate("cartItem").exec();

    if (!cart || !cart.cartItem) {
      return res.status(404).json({ error: "Cart Item not found" });
    }
    const cartItems = cart.cartItem;
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart item", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createCartItem = async (cartId: any, productId: any) => {
  //   const { cartId, productId } = req.body;
  try {
    const newCartItem = await CartItem.create({
      cartId,
      productId,
      quantity: 1,
    });

    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Update the cartItem array in the cart
    cart.cartItem.push(newCartItem._id);
    await cart.save();

    return newCartItem;
  } catch (error) {
    console.error("Error creating cart item:", error);
    throw error;
  }
};

const increaseQuantity = async (req: Request, res: Response) => {
  //   const user = req.user as UserWithId;
  const { cartId, productId } = req.body;

  try {
    // if (!user) {
    //   return res.json("no user found!");
    // }
    // let cart = await Cart.findOne({ userId: user.id });

    // let cartItem = cart?.cartItem.find(
    //   (item: any) => item.productId === productId
    // );

    const existingCartItem = await CartItem.findOne({ cartId, productId });
    if (!existingCartItem) {
      // If cartItem doesn't exist, create a new one with initial quantity of 1
      const newCartItem = await createCartItem(cartId, productId);
      return res.status(201).json(newCartItem);
    }

    // Increment the quantity by 1
    existingCartItem.quantity += 1;
    await existingCartItem.save();
    return res.status(200).json(existingCartItem);
  } catch (error) {
    console.error("Error handling cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getCartItem, createCartItem, increaseQuantity };
