import { body } from "express-validator";

export const createUserSchema = [
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isAlphanumeric()
    .withMessage("Username should only contain letters and numbers")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username should be between 3 and 30 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email address"),

  body("password").notEmpty().withMessage("Password cannot be empty"),
];
