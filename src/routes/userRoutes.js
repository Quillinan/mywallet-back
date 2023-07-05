import express from "express";
import userController from "../controllers/User.Controller.js";
// import auth from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Rota de cadastro (signup)
router.post("/signup", (req, res) => userController.signUp(req, res));

// Rota de login (signin)
router.post("/signin", (req, res) => userController.signIn(req, res));

export default router;
