import { body } from "express-validator";

export const createProductSchema = [
  body("name")
    .notEmpty()
    .withMessage("product name cannot be empty")
    .isString()
    .withMessage("product must be a string"),

  body("price")
    .notEmpty()
    .withMessage("price cannot be empty")
    .isNumeric()
    .withMessage("price must be a number"),
];

export const updateProductSchema = [
  body("name")
    .optional()
    .notEmpty()
    .withMessage("product name cannot be empty")
    .isString()
    .withMessage("product must be a string"),

  body("price")
    .optional()
    .notEmpty()
    .withMessage("price cannot be empty")
    .isNumeric()
    .withMessage("price must be a number"),
];
