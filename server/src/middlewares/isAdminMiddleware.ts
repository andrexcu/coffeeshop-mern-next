import { Request, Response, NextFunction } from "express";
import { userType } from "../types/userType";

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as userType;
  if (req.isAuthenticated() && user && user.isAdmin) {
    return next();
  } else {
    res.status(403).json({ error: "Unauthorized - Admins only" });
  }
};
