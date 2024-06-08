import express from "express";
import { createUser } from "../controllers/UserController";
import { createUserSchema } from "../validation/UserSchema";

export const usersRouter = express.Router();

usersRouter.post("/", createUserSchema, createUser);
