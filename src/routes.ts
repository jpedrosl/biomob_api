import express from "express"
import validationBody from "./middlewares/validateBody"
import loginSchema from "./validation/authSchema"
import userSchema from "./validation/userSchema"
import { authController } from "./controllers/authController"

const router = express.Router()

router.post("/auth/register", validationBody(userSchema) , authController.register )

export { router}