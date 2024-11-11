import joi from "joi";
import { phoneData } from "../protocols/protocols";

export const phonesSchema = joi.object<phoneData>({
  number: joi.string().required(),
  carrierCode: joi.number().required(),
  name: joi.string().required(),
  description: joi.string().required(),
  cpf: joi.string().custom(value => {
    const onlyNumbers = value.replace(/\D/g, '');
    return onlyNumbers;
  }).length(11).required()
})