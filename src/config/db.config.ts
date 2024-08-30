import mongoose from "mongoose";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Conexión establecida con la base de datos");
  } catch (error) {
    console.log("Error al conectar con la base de datos");
    exit(1);
  }
};
