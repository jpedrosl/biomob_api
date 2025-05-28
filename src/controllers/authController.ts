import { jwtService } from "../service/jwtService"
import { userService } from "../service/userService"
import { Request , Response } from "express"

export const authController = {
  register: async (req : Request , res: Response) => {
    const { name , email , password , role, birthDate, photoUrl, verified} = req.body

    try {

      const userAlreadyExists = await userService.findByEmail(email)

      if ( userAlreadyExists ) {
        return res.status(409).json({message: `invalid email and/or password`})
      }

      const user = await userService.save( { name , email , password , role, birthDate, photoUrl, verified} )
      res.status(201).json(user) 
    } catch (error) {

      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  },
  login: async (req : Request , res: Response) => {
    const { email , password} = req.body

    try {
      const user = await userService.findByEmail(email)

      if (!user) {
        return res.status(400).json({message: `invalid email and/or password`})
        
      }

      user.checkPassword(password ,(err, isSamePassword) => {
        if (err) return res.status(400).json({message: `invalid email and/or password`})

          if (!isSamePassword) {
            return res.status(400).json({message: `invalid email and/or password`})
            
          }

      const payLoad = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        birthDate: user.birthDate,
        photoUrl: user.photoUrl,
        verified: user.verified,

      }

      const token = jwtService.generateToken(payLoad , process.env.JWT_EXPIRES || '1d')

     return res.status(200).json({authenticated: true , ...payLoad , token})
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message)
        
      }
    }
  }
}