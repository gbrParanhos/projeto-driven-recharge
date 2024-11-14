import { Request, Response } from "express";
import { createPhone, listPhones } from "../services/phonesServices";

export const postPhones = async (req: Request, res: Response) => {
  const result = await createPhone(req.body)
  res.status(201).send(result.rows[0]);
}

export const getPhonesByCpf = async (req: Request, res: Response) => {
  const result = await listPhones(req.params.document)
  res.status(200).send(result);
}