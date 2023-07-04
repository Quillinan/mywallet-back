import express from "express";
import UserController from "../controllers/UserController.js";
import auth from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.get("/", UserController.index);
router.post("/", auth, UserController.create);

export default router;
