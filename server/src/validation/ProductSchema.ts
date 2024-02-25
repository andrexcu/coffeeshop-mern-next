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

  body("image")
    .notEmpty()
    .withMessage("product image cannot be empty")
    .isString()
    .withMessage("image url must be a string"),
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
