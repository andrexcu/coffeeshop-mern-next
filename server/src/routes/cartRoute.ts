import express, { Request, Response } from "express";
import { createCart, getCart } from "../controllers/CartController";

export const cartRouter = express.Router();

// authRouter.post("/login", passport.authenticate("local"), loginUser);
// authRouter.post("/logout", logoutUser);
cartRouter.get("/", getCart);
cartRouter.post("/", createCart);
