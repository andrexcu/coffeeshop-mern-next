import jwt from "jsonwebtoken";
import { userType } from "../types/userType";

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};
