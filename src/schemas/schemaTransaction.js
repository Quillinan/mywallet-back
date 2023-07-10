import Joi from "joi";

const transactionSchema = Joi.object({
  value: Joi.number().positive().required(),
  description: Joi.string().required(),
});

export default transactionSchema;
