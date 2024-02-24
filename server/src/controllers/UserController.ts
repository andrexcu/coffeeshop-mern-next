import { Request, Response, Router } from "express";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { hashPassword } from "../validation/hashPassword";
import { User } from "../models/User";

const createUser = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send(result.array());
  }

  const data = matchedData(req);

  data.password = hashPassword(data.password);

  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    req.session.id = savedUser.id;
    return res.status(201).send(savedUser);
  } catch (err) {
    return res.sendStatus(400);
  }
};

export { createUser };
