import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
    expiresIn: "30m",
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};
