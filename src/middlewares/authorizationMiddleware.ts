import jwt from 'jsonwebtoken'
import type { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()

async function authorizationMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string, (error, payload) => {
      if (error) {
        return res.status(401).json({ message: "Token inválido" });
      }
      return payload; // retorna os dados codificados do token
    }) as unknown as { role: string };

    // if (decode.role === 'admin') {
    //   const roleUser = decode.role
    // }

    switch (decode.role) {
      case "admin":
        break;
      case "user":
        break;
      default:
        return res.status(401).json({ message: "Não authorizado" })
    }


  } catch (error) {
    res.status(401).json({ message: "Não autorizado" })
  }
}

export { authorizationMiddleware }