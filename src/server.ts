import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB, corsConfig } from "./config";
import { userRoutes } from "./routes";

// Variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Iniclializamos nuestro servidor
const app = express();

// Cors
app.use(cors(corsConfig));

// Logging
app.use(morgan("dev"));

// Leer datos del formulario
app.use(express.json());

// Rutas
app.use("/api/v1/users", userRoutes);

export default app;
