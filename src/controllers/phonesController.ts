import { Request, Response } from "express";
import { createPhone } from "../services/phonesServices";

export const postPhones = async (req: Request, res: Response) => {
  await createPhone(req.body)
  res.sendStatus(201);
}