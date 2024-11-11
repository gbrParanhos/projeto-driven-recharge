import { NextFunction, Request, Response } from "express";
import { unprocessableError } from "../errors/errors";
import { ObjectSchema } from "joi";

export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      throw unprocessableError(errors)
    }
    next();
  }
}