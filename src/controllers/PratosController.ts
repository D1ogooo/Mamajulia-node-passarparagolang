import type { Request, Response } from "express";
import { Pratos } from "../models/pratosModel";

class pratosControllers {
  async create(req: Request, res: Response) {
    const { image, name, description, ingredientes, price, status } = req.body;
    const prato = new Pratos({

    })
  }

  async read(req: Request, res: Response) {

  }

  async update(req: Request, res: Response) {

  }

  async delete(req: Request, res: Response) {

  }
}

export { pratosControllers }