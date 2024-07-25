import express, { Request, Response } from "express";
import {
  createCart,
  getCart,
  getCartItems,
  getCartQuantity,
} from "../controllers/CartController";

export const cartRouter = express.Router();

// authRouter.post("/login", passport.authenticate("local"), loginUser);
// authRouter.post("/logout", logoutUser);
cartRouter.get("/", getCart);
cartRouter.post("/getCartQuantity", getCartQuantity);
cartRouter.post("/getCartItems", getCartItems);
cartRouter.post("/", createCart);
