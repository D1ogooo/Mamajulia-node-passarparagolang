import type { Request, Response } from "express";

class pratosControllers {
  async create(req: Request, res: Response) {
    const { image, name, description, ingredientes, price, status } = req.body;

  }

  async read(req: Request, res: Response) {

  }

  async update(req: Request, res: Response) {

  }

  async delete(req: Request, res: Response) {

  }
}

export { pratosControllers }