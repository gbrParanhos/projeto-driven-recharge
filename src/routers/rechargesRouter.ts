import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { getRecharges, postRecharges } from "../controllers/rechargesController";
import { rechargesSchema } from "../schemas/rechargesSchema";

const rechargesRouter = Router();

rechargesRouter.post('/recharges', validateSchema(rechargesSchema), postRecharges);
rechargesRouter.get('/recharges/:number', getRecharges);

export default rechargesRouter;