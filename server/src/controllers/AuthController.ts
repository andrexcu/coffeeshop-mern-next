import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { userType } from "../types/userType";
import { generateAccessToken, generateRefreshToken } from "../jwt/token";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let refreshTokens: string[] = [];

interface AuthenticatedRequest extends Request {
  user?: any;
}

const loginUser = async (req: Request, res: Response) => {
  // res.json(req.user);
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    //Generate an access token

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json("Username or password incorrect!");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
};

const logoutUser = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  
  res.status(200).json("You logged out successfully.");
};

export interface UserWithId extends Omit<userType, "_id"> {
  id: string;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

const checkAuthStatus = (req: AuthenticatedRequest, res: Response) => {
  const user = req.user;
  console.log("Authenticated User:", user); // Debug log

  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(401).json("Not authenticated");
  }
};

export { loginUser, logoutUser, verifyToken, checkAuthStatus };
