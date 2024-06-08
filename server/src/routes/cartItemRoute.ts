import express, { Request, Response } from "express";
import {
  createCartItem,
  decreaseQuantity,
  getCartItem,
  getItemQuantity,
  increaseQuantity,
  mergeLocalCartToUser,
} from "../controllers/CartItemController";

export const cartItemRouter = express.Router();

// authRouter.post("/login", passport.authenticate("local"), loginUser);
// authRouter.post("/logout", logoutUser);
cartItemRouter.get("/", getCartItem);
cartItemRouter.post("/increaseQuantity", increaseQuantity);
cartItemRouter.post("/decreaseQuantity", decreaseQuantity);
cartItemRouter.post("/getItemQuantity", getItemQuantity);
cartItemRouter.post("/mergeLocalCartToUser", mergeLocalCartToUser);
cartItemRouter.post("/", createCartItem);
