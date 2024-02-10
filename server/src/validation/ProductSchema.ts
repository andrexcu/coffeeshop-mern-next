export const productValidationSchema = {
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
