import 'dotenv/config';
import express, { json, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";


const app = express();
app.use(cors());
app.use(json());

app.get('/health',(req: Request, res: Response) => {res.sendStatus(200)})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running in port ${port}`);
})