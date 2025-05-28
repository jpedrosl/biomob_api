import { reflorestationService } from "../service/reflorestationService"
import { Request , Response } from "express"

export const reflorestationController= {
  create: async (req : Request , res: Response) => {
    const { name , description , address , city, state, country, postalCode, latitude, longitude, areasize, status} = req.body

    try {

      const reflorestarion = await reflorestationService.save( { name ,description, address, city, state, country, postalCode, latitude, longitude,areasize, status } )
      res.status(201).json(reflorestarion) 
    } catch (error) {

      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  },
  
}