import bcrypt from "bcrypt";

// Función para hashear password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Función para comparar passwords
// EnteredPassowrd: Password que queremos validar
// storedHash: Password hasheado de la base de datos
export const checkPassword = async (
  enteredPassword: string,
  storedHash: string
) => {
  return await bcrypt.compare(enteredPassword, storedHash);
};
