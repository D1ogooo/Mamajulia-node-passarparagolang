import type { Request, Response } from "express";
import prisma from "../lib/prisma";

class pratosControllers {
	async create(req: Request, res: Response): Promise<Response | any> {
		const { name, description, ingredients, price, status } = req.body;

		const image = req.file?.path;

		if (!image || !name || !description || !ingredients || !price || !status) {
			// console.log("Campos recebidos:", {
			// 	image,
			// 	name,
			// 	description,
			// 	ingredients,
			// 	price,
			// 	status,
			// });
			return res.status(400).json({
				message: "Todos os campos são obrigatórios",
			});
		}

		const verifyName = await prisma.prato.findFirst({ where: { name } });
		verifyName
			? res.status(400).json({ message: "Prato já cadastrado" })
			: null;

		try {
			await prisma.prato.create({
				data: {
					image,
					name,
					description,
					ingredients,
					price,
					status,
				},
			});

			return res.status(201).json({
				message: "Prato cadastrado com sucesso",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Erro ao cadastrar prato" });
		}
	}

	async list(req: Request, res: Response): Promise<Response | any> {
		try {
			const publicItens = await prisma.prato.findMany();
			return res.status(200).json(publicItens);
		} catch (error) {
			res.status(500).json({ error: "falha ao listar usuários" });
			//console.log(error)
		}
	}

	async update(req: Request, res: Response): Promise<Response | any> {
		try {
			const { id } = req.params;
			const { name, description, ingredients, price, status } = req.body;

			const image = req.file?.path;

			if (!id)
				return res.status(404).json({
					error: "comida não encontrada",
				});
			if (
				!image ||
				!name ||
				!description ||
				!ingredients ||
				!price ||
				!status
			) {
				return res.status(400).json({
					error: "é necessario declarar todos os componentes",
				});
			}

			await prisma.prato.update({
				where: { id },
				data: {
					image,
					name,
					description,
					ingredients: JSON.parse(ingredients),
					price: Number(price),
					status,
				},
			});

			return res.status(200).json({ "sucesso!": "comida atualizada!" });
		} catch (error) {
			return res.status(500).json({ message: "Erro ao cadastrar prato" });
			//console.log(error);
		}
	}

	async delete(req: Request, res: Response): Promise<Response | any> {
		try {
			const { id } = req.params;

			if (!id)
				return res.status(404).json({
					error: "comida não encontrada",
				});

			await prisma.prato.delete({
				where: { id },
			});

			// falta fazer a logica para deletar do cloudinary

			res.status(200).json({ "sucesso!": "comida deletada com sucesso!" });
		} catch (error) {
			res.status(500).json({ error: "Erro ao deletar produto" });
		}
	}
}

export { pratosControllers };
