import express, { Request, Response } from "express";
import passport from "passport";
import {
  authenticateToken,
  checkAuthStatus,
  loginUser,
  logoutUser,
  refresh,
  verifyToken,
} from "../controllers/AuthController";

export const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh", refresh)
authRouter.get("/status", checkAuthStatus);

