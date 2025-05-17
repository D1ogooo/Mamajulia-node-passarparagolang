import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import { jwtConfig } from "../configs/auth";
dotenv.config();

async function authorizationMiddleware(
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
		const decode = jwt.verify(token, jwtConfig.secretJWT as string) as {
			role: string;
		};

		switch (decode.role) {
			case "ADMIN":
				next();
				break;
			case "USER":
				res.status(403).json({ message: "Acessso negado" });
				break;
			default:
				return;
		}
	} catch (error) {
		res.status(401).json({ message: "Não autorizado" });
	}
}

export { authorizationMiddleware };
