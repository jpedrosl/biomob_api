import { seedlingService } from "../service/seedlingService"
import { Request , Response } from "express"

export const seedlingController = {
  create: async (req: Request, res: Response) => {
    const {
      REFLORESTATION_AREA_ID,
      SPECIES_NAME,
      SCIENTIFIC_NAME,
      PLANTING_DATE,
      LATITUDE,
      LONGITUDE,
      CURRENT_HEIGHT,
      CURRENT_STATUS,
      LAST_WATERING_DATE,
      LAST_MAINTENANCE_DATE,
      NOTES
    } = req.body

    try {
      const seedlingData = {
        REFLORESTATION_AREA_ID,
        SPECIES_NAME,
        SCIENTIFIC_NAME,
        PLANTING_DATE,
        COORDINATES: (LATITUDE !== undefined && LONGITUDE !== undefined) ? [LONGITUDE, LATITUDE] : undefined,
        CURRENT_HEIGHT,
        CURRENT_STATUS,
        LAST_WATERING_DATE,
        LAST_MAINTENANCE_DATE,
        NOTES,
      }

      const newSeedling = await seedlingService.save(seedlingData as any)
      res.status(201).json(newSeedling)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message)
      }
    }
  },
}