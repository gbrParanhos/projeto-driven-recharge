import { Request, Response } from "express";
import { createRecharge, listRecharges } from "../services/rechargesServices";

export const postRecharges = async (req: Request, res: Response) => {
  const result = await createRecharge(req.body)
  res.status(201).send(result.rows[0]);
}

export const getRecharges = async (req: Request, res: Response) => {
  const result = await listRecharges(req.params.number)
  res.status(200).send(result);
}