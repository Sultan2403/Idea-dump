const { Joi } = require("celebrate");

const name = Joi.string()
  .trim()
  .min(3)
  .max(100)
  .pattern(/^[\p{L}\p{M}\d'’\.\-\s]+$/u)
  .required()
  .messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "string.pattern.base": "Name contains invalid characters",
  });

const email = Joi.string()
  .trim()
  .lowercase()
  .email({ tlds: { allow: false } }) 
  .required()
  .messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required",
  });

const password = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must be at most 128 characters",
    "string.pattern.base":
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

const userSchema = Joi.object({
  name: name,
  email: email,
  password: password,
})
  .required()
  .options({ stripUnknown: true });

module.exports = userSchema;
