import express from "express"
import validationBody from "./middlewares/validateBody"
import loginSchema from "./validation/authSchema"
import userSchema from "./validation/userSchema"
import { authController } from "./controllers/authController"
import { ensureAuth } from "./middlewares/auth"

const router = express.Router()

router.post("/auth/register", validationBody(userSchema)  , authController.register )

router.post("/auth/login",  validationBody(loginSchema) , authController.login )

export { router}