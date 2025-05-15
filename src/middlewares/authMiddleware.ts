import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { jwtConfig } from "../configs/auth";
dotenv.config();

async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Token não fornecido" });
	}

	try {
		//console.log(token);
		jwt.verify(token, jwtConfig.secretJWT as string);
		next();
	} catch (error) {
		return res.status(401).json({ message: "Não autorizado" });
		//console.log(error);
	}
}

export { authMiddleware };
