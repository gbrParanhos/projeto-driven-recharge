import { Router } from "express";
import { getSummary } from "../controllers/summaryController";

const summaryRouter = Router();

summaryRouter.get('/summary/:document', getSummary);

export default summaryRouter;