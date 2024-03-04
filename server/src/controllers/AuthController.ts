import { Request, Response } from "express";
import { User } from "../models/User";
import { userType } from "../types/userType";

const loginUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

const logoutUser = async (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  try {
    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.sendStatus(500);
      }

      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          console.error("Error destroying session:", sessionErr);
          return res.sendStatus(500);
        }

        res.json(`User successfully logged out! `);
      });
    });
  } catch (err) {
    console.error("Error during logout:", err);
    res.sendStatus(500);
  }
};

export interface UserWithId extends Omit<userType, "_id"> {
  id: string;
}
const checkAuthStatus = async (req: Request, res: Response) => {
  // console.log("user id: ", (req.user as UserWithId)?.id);
  return res.json(req.user);
};

export { loginUser, logoutUser, checkAuthStatus };
