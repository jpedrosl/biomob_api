import express from "express"
import validationBody from "./middlewares/validateBody"
import loginSchema from "./validation/authSchema"
import userSchema from "./validation/userSchema"
import reflorestationSchema from "./validation/reflorestitionSchema"
import { authController } from "./controllers/authController"
import { reflorestationController } from "./controllers/reflorestationController"
import { ensureAuth } from "./middlewares/auth"
import { seedlingController } from "./controllers/seedlingController"
import seedlingSchema from "./validation/seedlingSchema"


const router = express.Router()

router.post("/auth/register", validationBody(userSchema)  , authController.register )

router.post("/auth/login",  validationBody(loginSchema) , authController.login )

router.post("/reflorestation", reflorestationController.create )

router.post("/seedling", validationBody(seedlingSchema), seedlingController.create )



export { router}