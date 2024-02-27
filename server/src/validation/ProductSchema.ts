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
  body("popular")
    .optional()
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("onMenu")
    .optional()
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("special")
    .optional()
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("type")
    .optional()
    .notEmpty()
    .withMessage("Product type cannot be empty")
    .isString()
    .withMessage("Type must be a string")
    .isIn(["classic", "choco", "mocha"])
    .withMessage(
      "Invalid type. Allowed values are 'classic', 'choco', 'mocha'"
    ),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description cannot be empty")
    .isString()
    .withMessage("description must be a string"),
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
  body("popular")
    .optional() // The field is optional, as it has a default value
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("onMenu")
    .optional() // The field is optional, as it has a default value
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("special")
    .optional() // The field is optional, as it has a default value
    .isBoolean()
    .withMessage("Popular must be a boolean"),
  body("type")
    .optional()
    .notEmpty()
    .withMessage("Product type cannot be empty")
    .isString()
    .withMessage("Type must be a string")
    .isIn(["classic", "choco", "mocha"])
    .withMessage(
      "Invalid type. Allowed values are 'classic', 'choco', 'mocha'"
    ),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("description cannot be empty")
    .isString()
    .withMessage("description must be a string"),
];
