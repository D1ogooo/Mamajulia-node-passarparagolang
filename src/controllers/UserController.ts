import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { jwtConfig } from "../configs/auth";
import type { Request, Response } from "express";
import type { SignInType, SignUpType } from "../@types/AuthTypes";

class UsersControllers {
	async signIn(
		req: Request<any, any, SignInType>,
		res: Response,
	): Promise<any> {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email e senha são obrigatórios" });
		}

		const userEmail = await prisma.user.findUnique({ where: { email } });

		if (!userEmail) {
			return res.status(400).json({ message: "Email não encontrado" });
		}

		const userPassword = await bcrypt.compare(password, userEmail.password);

		if (!userPassword) {
			return res.status(400).json({ message: "Senha inválida" });
		}

		const token = jwt.sign(
			{ id: userEmail.id, name: userEmail.name, role: userEmail.role },
			jwtConfig.secretJWT as string,
			{ expiresIn: "1h" },
		);

		return res.status(200).json({
			token,
			message: "Usuário authenticado com sucesso",
		});
	}

	async signUp(
		req: Request<any, any, SignUpType>,
		res: Response,
	): Promise<any> {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name, Email e Password são obrigatórios" });
		}

		const userEmail = await prisma.user.findUnique({ where: { email } });

		if (userEmail) {
			return res.status(400).json({ message: "Email já cadastrado" });
		}

		const hashPassword = await bcrypt.hash(password, 10);

		await prisma.user.create({
			data: {
				name,
				email,
				password: hashPassword,
			},
		});
		return res.status(201).json({
			message: "Usuário criado com sucesso",
		});
	}
}

export { UsersControllers };
