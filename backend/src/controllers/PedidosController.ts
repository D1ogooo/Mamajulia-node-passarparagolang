import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import type { Request, Response } from "express";
import type { CustomJwtPayload } from "../@types/Authorization";
import type { Pedido } from "../generated/prisma";

class pedidosControllers {
	async create(req: Request, res: Response): Promise<Response<Pedido> | any> {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ error: "Token não fornecido" });
		}

		try {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string,
			) as CustomJwtPayload;

			const pedido = await prisma.pedido.findFirst({
				where: {
					userId: decoded.id,
				},
			});

			return res.status(200).json(pedido);
		} catch (error) {
			return res.status(401).json({ error: "Token inválido ou expirado" });
		}
	}

	// async list(
	// 	req: Request,
	// 	res: Response,
	// ): Promise<Response<Pedido | { error: string }>> {}
}

export { pedidosControllers };
