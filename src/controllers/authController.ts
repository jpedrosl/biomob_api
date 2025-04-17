import { userService } from "../service/userService"
import { Request , Response } from "express"

export const authController = {
  register: async (req : Request , res: Response) => {
    const { name , email , password} = req.body

    try {
      const userAlreadyExists = await userService.findByEmail(email)

      if ( userAlreadyExists ) {
        return res.status(409).json({message: `invalid email and/or password`})
      }

      const user = await userService.save( { name , email , password })
      res.status(201).json(user) 
    } catch (error) {

      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  }
}