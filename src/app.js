import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

// Criação do app
const app = express();

// Configurações
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Conexão com o Banco
const mongoClient = new MongoClient(process.env.DB_URL);

try {
  await mongoClient.connect(); // top level await
  console.log("MongoDB conectado!");
} catch (err) {
  (err) => console.log(err.message);
}

const db = mongoClient.db();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export { db };
