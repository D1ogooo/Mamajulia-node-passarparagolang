import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
}

export { authMiddleware }