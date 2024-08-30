import server from "./server";

const PORT = process.env.PORT || 4000;

// Levantando servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
