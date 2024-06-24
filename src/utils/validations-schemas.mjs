export const createUserValidationSchema = {
  name: {
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: "Name must be between 5 and 100 characters",
    },
    isString: { message: "Name must be a string" },
    notEmpty: { message: "Name must not be empty" },
  },
  displayname: {
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: "Display name must be between 5 and 100 characters",
    },
    isString: { message: "Display name must be a string" },
    notEmpty: { message: "Display name must not be empty" },
  },
  email: {
    isEmail: { message: "Email must be a valid email" },
    notEmpty: { message: "Email must not be empty" },
  },
};
