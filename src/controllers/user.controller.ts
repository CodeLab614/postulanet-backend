import type { Request, Response } from "express";
import { Types } from "mongoose";

import { Token, User } from "../models";
import { IUser } from "../types";
import {
  checkPassword,
  generateJWT,
  generateToken,
  hashPassword,
} from "../helpers";
import { UserEmail } from "../emails";

export class UserController {
  // Create a new user
  static createUser = async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
      // Verificar que no exista el email
      const emailExists = await User.findOne({ email: req.body.email });

      if (emailExists) {
        return res.status(409).json({
          response: "error",
          message: "El correo electrónico ya esta registrado",
        });
      }

      // Crear el usuario
      const user = new User(req.body);

      // Hashear password
      user.password = await hashPassword(req.body.password);

      // Generamos el token de 6 digitos
      const token = new Token({
        token: generateToken(),
        user: user._id,
      });

      // Guardamos el usuario y el token en la base de datos
      await Promise.allSettled([user.save(), token.save()]);

      // Enviamos el email de confirmación de cuenta
      UserEmail.confirmAccountEmail({
        email: user.email,
        name: user.firstName,
        token: token.token,
      });

      res.status(202).json({
        response: "success",
        message:
          "Cuenta creada, se enviaron las instrucciones al correo electrónico registrado.",
      });
    } catch (error) {
      console.log(`[ERROR_CREATE_USER]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };

  // Confirm account
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });

      if (!tokenExists) {
        return res
          .status(404)
          .json({ response: "error", message: "Token no válido" });
      }

      // Buscamos al usuario y cambiamos su propiedad de confirmed
      const user = await User.findById(tokenExists.user);
      user.emailVerified = true;

      // Guardamos los cambios del usuario y eliminamos el token de un solo uso
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res
        .status(200)
        .json({ response: "success", message: "Cuenta confirmada" });
    } catch (error) {
      console.log(`[ERROR_CONFIRM_ACCOUNT]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };

  // Login
  static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Verificar si el usuario existe
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ response: "error", message: "Usuario no encontrado" });
      }

      // Verificar password
      const isPasswordCorrect = await checkPassword(password, user.password);

      if (!isPasswordCorrect) {
        return res
          .status(401)
          .json({ response: "error", message: "Password incorrecto" });
      }

      // Verificar si el usuario esta activo
      if (!user.isActive) {
        return res.status(401).json({
          response: "error",
          message: "Cuenta inactiva, contacta a un administrador",
        });
      }

      // Verificar si el usuario esta confirmado
      if (!user.emailVerified) {
        // Generamos un nuevo token
        const token = new Token({
          token: generateToken(),
          user: user._id,
        });

        await token.save();

        // Enviamos el email con el token
        UserEmail.confirmAccountEmail({
          email: user.email,
          name: user.firstName,
          token: token.token,
        });

        return res.status(401).json({
          response: "error",
          message:
            "La cuenta no ha sido confirmada, se ha enviado un email de confirmación",
        });
      }

      // Generamos el jsonwebtoken
      const token = generateJWT({ id: user._id as Types.ObjectId });
      res.status(200).json({ response: "success", token });
    } catch (error) {
      console.log(`[ERROR_LOGIN]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };

  // Forgot password
  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      // Verificar que exista el email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          response: "error",
          message: "Usuario no encontrado",
        });
      }

      // Generamos el token de 6 digitos
      const token = new Token({
        token: generateToken(),
        user: user._id,
      });

      // Guardamos el nuevo token
      await token.save();

      // Enviamos el email de confirmación de cuenta
      UserEmail.forgotPasswordEmail({
        email: user.email,
        name: user.firstName,
        token: token.token,
      });

      res.status(200).json({
        response: "success",
        message: "Se enviaron las instrucciones al correo electrónico",
      });
    } catch (error) {
      console.log(`[ERROR_FORGOT_PASSWORD]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };

  // Get me
  static getMe = async (req: Request, res: Response) => {
    try {
      // Traemos la información del usuario y la deolvemos
      const { user } = req;

      res.status(200).json({ response: "success", user });
    } catch (error) {
      console.log(`[ERROR_GET_ME]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };

  // Update password
  static updatePassword = async (req: Request, res: Response) => {
    try {
      const tokenExists = await Token.findOne({ token: req.body.token });

      if (!tokenExists) {
        return res
          .status(404)
          .json({ response: "error", message: "Token no válido" });
      }

      // Buscamos al usuario y cambiamos su propiedad de confirmed
      const user = await User.findById(tokenExists.user);

      // Hashear nuevo password
      user.password = await hashPassword(req.body.password);

      // Guardamos los cambios del usuario y eliminamos el token de un solo uso
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res
        .status(200)
        .json({ response: "success", message: "Contraseña actualizada" });
    } catch (error) {
      console.log(`[ERROR_UPDATE_PASSWORD]: `, error);
      res
        .status(500)
        .json({ response: "error", message: "Error del servidor" });
    }
  };
}
