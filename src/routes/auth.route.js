import { Router } from "express";
import { checkSchema } from "express-validator";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { createUserRegValSchema } from "../utils/Validation.js";
const router = Router();

// To register the user and store in the database
router.post("register", checkSchema(createUserRegValSchema), registerUser);

// For alread registered users to login and to register the session in JWT
router.post("login", loginUser);

export default router;
