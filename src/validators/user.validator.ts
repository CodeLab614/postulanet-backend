import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validatorCreateUser = [
  check("firstName").notEmpty().withMessage("El nombre es obligatorio"),
  check("lastName").notEmpty().withMessage("El apellido es obligatorio"),
  check("email")
    .exists()
    .isEmail()
    .toLowerCase()
    .withMessage("El email no es válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorConfirmAccount = [
  check("token").notEmpty().withMessage("Token no válido"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorLogin = [
  check("email")
    .exists()
    .isEmail()
    .withMessage("El email no es válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("El password es obligatorio"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorForgotPassword = [
  check("email")
    .exists()
    .isEmail()
    .withMessage("El email no es válido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];

export const validatorUpdatePasswordUser = [
  check("token").notEmpty().withMessage("El token es obligatorio"),
  check("password")
    .exists()
    .notEmpty()
    .withMessage("El password es obligatorio")
    .isLength({ min: 8 })
    .withMessage("El password debe contener al menos 8 caracteres"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(403).json({ errors: error.array() });
    }
  },
];
