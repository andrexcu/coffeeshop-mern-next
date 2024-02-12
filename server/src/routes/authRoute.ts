import express, { Request, Response } from "express";
import passport from "passport";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from "../controllers/AuthController";

export const authRouter = express.Router();

authRouter.post("/login", passport.authenticate("local"), loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/status", checkAuthStatus);
