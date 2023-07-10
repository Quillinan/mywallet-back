import Joi from "joi";

export const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const signInSchema = Joi.object().xor("email", "name").keys({
  email: Joi.string().email(),
  name: Joi.string(),
  password: Joi.string().required(),
});
