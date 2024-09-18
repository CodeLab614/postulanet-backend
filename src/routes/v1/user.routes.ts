import { Router } from "express";
import {
  validatorConfirmAccount,
  validatorCreateUser,
  validatorForgotPassword,
  validatorLogin,
} from "../../validators";
import { UserController } from "../../controllers";
import { checkAuth } from "../../middlewares";
import { validatorUpdatePasswordUser } from "../../validators/user.validator";

export const userRoutes = Router();

// Registrar cuenta
userRoutes.post("/", validatorCreateUser, UserController.createUser);

// Confirmar cuenta
userRoutes.post(
  "/confirm",
  validatorConfirmAccount,
  UserController.confirmAccount
);

// Login
userRoutes.post("/login", validatorLogin, UserController.login);

// Forgot password
userRoutes.post(
  "/forgot-password",
  validatorForgotPassword,
  UserController.forgotPassword
);

// Obtener usuario de la sesión
userRoutes.get("/get-me", checkAuth, UserController.getMe);

// Actualizar password al olvidarlo
userRoutes.post(
  "/update-password",
  validatorUpdatePasswordUser,
  UserController.updatePassword
);
