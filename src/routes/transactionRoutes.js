import express from "express";
import transactionController from "../controllers/Transaction.Controller.js";

const transactionRoutes = express.Router();

// Rota para adicionar transação
transactionRoutes.post(
  "/nova-transacao/:tipo",
  transactionController.addTransaction
);

export default transactionRoutes;
