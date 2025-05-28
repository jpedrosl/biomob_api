import express from "express"
import validationBody from "./middlewares/validateBody"
import loginSchema from "./validation/authSchema"
import userSchema from "./validation/userSchema"
import reflorestationSchema from "./validation/reflorestitionSchema"
import { authController } from "./controllers/authController"
import { reflorestationController } from "./controllers/reflorestationController"
import { ensureAuth } from "./middlewares/auth"

const router = express.Router()

router.post("/auth/register", validationBody(userSchema)  , authController.register )

router.post("/auth/login",  validationBody(loginSchema) , authController.login )

router.post("/reflorestation", reflorestationController.create )

export { router}