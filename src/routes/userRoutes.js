import express from "express";
import userController from "../controllers/User.Controller.js";
import verifyToken from "../middlewares/AuthMiddleware.js";

const userRoutes = express.Router();

// Rota de cadastro (signup)
userRoutes.post("/signup", userController.signUp);

// Rota de login (signin)
userRoutes.post("/signin", userController.signIn);

// Rota de logout
userRoutes.post("/logout",verifyToken, userController.logout);

// Rota de atualização de usuário
userRoutes.get("/username", verifyToken, userController.getSessionbyToken);

export default userRoutes;

