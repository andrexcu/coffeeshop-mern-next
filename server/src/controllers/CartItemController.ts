import { Request, Response } from "express";
import CartItem from "../models/CartItem";
import Cart from "../models/Cart";
import { UserWithId } from "./AuthController";
import { cartItemType } from "../types/cartItemType";
import { createCart } from "./CartController";
import mongoose from "mongoose";

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

const removeCartItem = async (cartId: any, productId: any) => {
  //   const { cartId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const existingCartItem = await CartItem.findOne({
      cartId: cart?.id,
      productId,
    });
    await CartItem.findOneAndDelete({ cartId: cart?.id, productId });
    await Cart.updateOne(
      { _id: cart._id },
      { $pull: { cartItem: existingCartItem?._id } }
    );
  } catch (error) {
    console.error("Error creating cart item:", error);
    throw error;
  }
};

const increaseQuantity = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;

  try {
    if (!userId) {
      return res.json("no user found!");
    }
    let cart = await Cart.findOne({ userId });

    let newCart;

    if (!cart) {
      cart = await Cart.create({
        userId,
        cartItem: [], // Initialize with an empty array of cart items
      });
    }

    const existingCartItem = await CartItem.findOne({
      cartId: cart?.id,
      productId,
    });

    if (!existingCartItem) {
      // If cartItem doesn't exist, create a new one with initial quantity of 1
      const newCartItem = await createCartItem(cart?.id, productId);
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

const decreaseQuantity = async (req: Request, res: Response) => {
  const { productId, userId } = req.body;

  try {
    if (!userId) {
      return res.json("no user found!");
    }
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json("no cart found!");
    }

    const existingCartItem = await CartItem.findOne({
      cartId: cart?.id,
      productId,
    });

    if (!existingCartItem) {
      return res.json("cart item doesnt exist");
    }

    // Increment the quantity by 1
    existingCartItem.quantity -= 1;
    await existingCartItem.save();

    if (existingCartItem.quantity <= 0) {
      await removeCartItem(cart?.id, productId);
    }
    return res.status(200).json(existingCartItem);
  } catch (error) {
    console.error("Error handling cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getItemQuantity = async (req: Request, res: Response) => {
  // const user = req.user as UserWithId;
  const { productId, userId } = req.body;

  try {
    if (!userId) {
      return res.json("no user found!");
    }
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.json("no cart found!");
    }
    const existingCartItem = await CartItem.findOne({
      cartId: cart?.id,
      productId,
    });

    if (!existingCartItem) return res.json(0);

    return res.json(existingCartItem.quantity);
  } catch (error) {
    console.error("Error handling cart item:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const mergeLocalCartToUser = async (req: Request, res: Response) => {
  const { userId, localCartItems } = req.body;

  try {
    if (!userId) {
      return res.status(400).json({ error: "No user found!" });
    }

    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = await Cart.create({
        userId,
        cartItem: [], // Initialize with an empty array of cart items
      });
    }

    // Ensure localCartItems is an array
    if (!Array.isArray(localCartItems)) {
      return res.status(400).json({
        error: "Invalid request format. Expected an array of cart items.",
      });
    }

    // Use a transaction for atomicity
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (const localCartItem of localCartItems) {
        if (!localCartItem || !localCartItem.id || !localCartItem.quantity) {
          console.error("Invalid localCartItem:", localCartItem);
          continue; // Skip the current iteration if localCartItem is invalid
        }

        // increment quantity or create a new item
        const updatedCartItem = await CartItem.findOneAndUpdate(
          {
            cartId: userCart.id,
            productId: localCartItem.id,
          },
          {
            $inc: { quantity: localCartItem.quantity },
          },
          { upsert: true, new: true }
        );

        console.log("Item updated or created successfully");

        const updatedItemId = updatedCartItem._id; // Assuming updatedCartItem._id is already an ObjectId

        const cartItemExists = userCart.cartItem.some((c) => {
          console.log("Comparison:", c.equals(updatedItemId));
          return c.equals(updatedItemId);
        });

        if (!cartItemExists) {
          userCart.cartItem.push(updatedCartItem._id);
        }
      }

      await userCart.save();

      await session.commitTransaction();
      session.endSession();

      return res.json("Local cart merged with user cart successfully!");
    } catch (error) {
      console.error("Error merging carts:", error);
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error finding user cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getCartItem,
  createCartItem,
  increaseQuantity,
  decreaseQuantity,
  getItemQuantity,
  mergeLocalCartToUser,
};
