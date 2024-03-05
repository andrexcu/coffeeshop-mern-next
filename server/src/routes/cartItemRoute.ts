import express, { Request, Response } from "express";
import {
  createCartItem,
  getCartItem,
  getItemQuantity,
  increaseQuantity,
} from "../controllers/CartItemController";

export const cartItemRouter = express.Router();

// authRouter.post("/login", passport.authenticate("local"), loginUser);
// authRouter.post("/logout", logoutUser);
cartItemRouter.get("/:id", getCartItem);
cartItemRouter.post("/increaseQuantity", increaseQuantity);
cartItemRouter.post("/getItemQuantity", getItemQuantity);
cartItemRouter.post("/", createCartItem);
