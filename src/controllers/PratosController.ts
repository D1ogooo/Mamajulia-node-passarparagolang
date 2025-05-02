import type { Request, Response } from "express";
import prisma from "../lib/prisma";

class pratosControllers {
  async create(req: Request, res: Response): Promise<any> {
    const { image, name, description, ingredients, price, status } = req.body;

    if (!image || !name || !description || !ingredients || !price || !status) {
      console.log("image",
        image, "name",
        name, "description",
        description, "ingredients",
        ingredients, "price",
        price, "status",
        status)
      return res.status(400).json({ "message": "Todos os campos são obrigatórios" });
    }

    // const verifyName = await prisma.prato.findFirst({ where: { name } });
    // verifyName ? res.status(400).json({ message: "Prato já cadastrado" }) : null;

    await prisma.prato.create({
      data: {
        image,
        name,
        description,
        ingredients,
        price,
        status
      }
    })
    // .then(() => {
    //   return res.status(201).json({ message: "Prato cadastrado com sucesso" });
    // })
    // .catch((error) => {
    //   return res.status(500).json({ message: "Erro ao cadastrar prato", error });
    // });
  }

  async read(req: Request, res: Response) {

  }

  async update(req: Request, res: Response) {

  }

  async delete(req: Request, res: Response) {

  }
}

export { pratosControllers }