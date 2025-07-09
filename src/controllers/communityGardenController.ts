import { Request, Response } from "express";
import { communityGardenService } from "../service/communityGardenService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const communityGardenController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      name,
      description,
      address,
      city,
      state,
      country,
      postalCode,
      latitude,
      longitude,
      polygon,
      areaSize,
      establishedDate,
      status,
      contactPerson,
      photoUrl,
    } = req.body;

    try {
      const gardenData = {
        name,
        description,
        address,
        city,
        state,
        country,
        postalCode,
        latitude,
        longitude,
        polygon, // Virá como array do body, o service converterá para GeoJSON
        areaSize,
        establishedDate,
        status,
        contactPerson,
        photoUrl,
      };

      const newGarden = await communityGardenService.save(gardenData);
      return res.status(201).json(newGarden);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar horta comunitária.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const gardens = await communityGardenService.findAll();
      return res.status(200).json(gardens);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar hortas comunitárias.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const garden = await communityGardenService.findById(id);
      if (!garden) {
        return res.status(404).json({ message: "Horta comunitária não encontrada." });
      }
      return res.status(200).json(garden);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar horta comunitária por ID.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; // Partial<CommunityGardenCreationAttributes>

    try {
      const updatedGarden = await communityGardenService.update(id, updates);
      if (!updatedGarden) {
        return res.status(404).json({ message: "Horta comunitária não encontrada para atualização." });
      }
      return res.status(200).json(updatedGarden);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar horta comunitária.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await communityGardenService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Horta comunitária não encontrada para exclusão." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar horta comunitária.");
    }
  },
};
