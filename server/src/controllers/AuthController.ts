import { Request, Response } from "express";

const loginUser = async (req: Request, res: Response) => {
  res.sendStatus(200);
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

const checkAuthStatus = async (req: Request, res: Response) => {
  console.log(req.session);
  return res.json(req.user);
};

export { loginUser, logoutUser, checkAuthStatus };
