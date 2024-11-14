import joi from "joi";

export const rechargesSchema = joi.object({
  value: joi.number().min(1000).max(100000).required(),
  id_phone: joi.number().required()
})