import { Router } from "express";
import * as AuthController from "../../controllers/AuthController";

const router = Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUserController);

export default router;
