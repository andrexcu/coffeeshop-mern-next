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

// export const updateProductSchema = [
//   body("name")
//     .optional()
//     .notEmpty()
//     .withMessage("product name cannot be empty")
//     .isString()
//     .withMessage("product must be a string"),

//   body("price")
//     .optional()
//     .notEmpty()
//     .withMessage("price cannot be empty")
//     .isNumeric()
//     .withMessage("price must be a number"),
// ];
