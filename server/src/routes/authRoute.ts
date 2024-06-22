import express, { Request, Response } from "express";
import passport from "passport";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  verifyToken,
} from "../controllers/AuthController";

export const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/status", verifyToken, checkAuthStatus);
