import { Request, Response } from "express";
import { readSummary } from "../services/summaryServices";

export const getSummary = async (req: Request, res: Response) => {
  const result = await readSummary(req.params.document)
  res.status(200).send(result);
}