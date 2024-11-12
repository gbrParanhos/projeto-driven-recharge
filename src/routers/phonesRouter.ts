import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { phonesSchema } from "../schemas/phonesSchema";
import { getPhonesByCpf, postPhones } from "../controllers/phonesController";

const phonesRouter = Router();

phonesRouter.post('/phones', validateSchema(phonesSchema), postPhones);
phonesRouter.get('/phones/:document', getPhonesByCpf);

export default phonesRouter;