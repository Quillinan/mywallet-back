import express from "express";
import userRoutes from "./userRoutes.js";
import transactionRoutes from "./transactionRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/transactions", transactionRoutes);

export default router;