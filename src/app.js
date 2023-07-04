import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/userRoutes.js";

const app = express();
const port = 5000;

// Middlewares globais
app.use(bodyParser.json());

// Rotas
app.use("/users", router);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
