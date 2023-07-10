import express from "express";
import transactionController from "../controllers/Transaction.Controller.js";
import verifyToken from "../middlewares/AuthMiddleware.js";

const transactionRoutes = express.Router();

// Rota para adicionar transação
transactionRoutes.post(
  "/:tipo",
  verifyToken,
  transactionController.addTransaction
);

export default transactionRoutes;
