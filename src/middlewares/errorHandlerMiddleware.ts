import { NextFunction, Request, Response } from "express";
import { error } from "../protocols/protocols";

const errorHandlerMiddleware = (err: error, req: Request, res: Response, next: NextFunction) => {
	if (err.type === "unprocessable" || err.type === "notClose") {
		res.status(400).send(err.message);
		return
	}
	if (err.type === "notFound") {
		res.status(404).send(err.message);
		return
	}
	if (err.type === "conflict") {
		res.status(409).send(err.message);
		return
	}
	if (err.type === "noStock" || err.type === "notOpen") {
		res.status(422).send(err.message);
		return
	}
	res.status(500).send(err.message);
}

export default errorHandlerMiddleware