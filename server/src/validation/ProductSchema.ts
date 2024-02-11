import { body } from "express-validator";

export const createProductValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "product name cannot be empty",
    },
    isString: {
      errorMessage: "product must be a string",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "price cannot be empty",
    },
    isNumeric: {
      errorMessage: "price must be a number",
    },
  },
};

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
