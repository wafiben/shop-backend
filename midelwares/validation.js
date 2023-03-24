const { body, validationResult } = require("express-validator");
const registrationValidation = [
  body("firstName", "you must type your name").isString(),
  body("email").isEmail(),
  body("password", "the passsword must be 6 caracter at least").isLength({
    min: 6,
  }),
];
const loginValudation = [
  body("email").isEmail(),
  body("password", "the passsword must be 6 caracter at least").isLength({
    min: 6,
  }),
];
const validation = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registrationValidation, validation, loginValudation };
