import { Request, Response } from "express";
import { createPhone, listPhonesByCpf } from "../services/phonesServices";

export const postPhones = async (req: Request, res: Response) => {
  await createPhone(req.body)
  res.sendStatus(201);
}

export const getPhonesByCpf = async (req: Request, res: Response) => {
  const result = await listPhonesByCpf(req.params.document)
  res.status(200).send(result);
}