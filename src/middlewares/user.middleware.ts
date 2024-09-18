import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../types";
import { User } from "../models";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res
      .status(401)
      .json({ response: "error", message: "Sin autorización" });
  }

  const [, token] = bearer.split(" ");

  try {
    // Decodificamos el jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select(
        "-password -__v -updatedAt -emailVerified -isActive"
      );

      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(404)
          .json({ response: "error", message: "Token no válido" });
      }
    }
  } catch (error) {
    res.status(500).json({ response: "error", message: "Token no válido" });
  }
};
