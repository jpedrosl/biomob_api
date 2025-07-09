import { reflorestationService } from "../service/reflorestationService";
import { Request , Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth"; // Para acessar req.user
import { ensureRole } from "../middlewares/ensureRole"; // Middleware para controle de acesso

export const reflorestationController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { name, description, address, city, state, country, postalCode, latitude, longitude, polygon, areaSize, status } = req.body;

    try {
      const reflorestation = await reflorestationService.save({
        name,
        description,
        address,
        city,
        state,
        country,
        postalCode,
        latitude,
        longitude,
        polygon, // Incluindo polygon aqui
        areaSize,
        status
      });
      res.status(201).json(reflorestation);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar área de reflorestamento.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const areas = await reflorestationService.findAll();
      return res.status(200).json(areas);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar áreas de reflorestamento.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const area = await reflorestationService.findById(id);
      if (!area) {
        return res.status(404).json({ message: "Área de reflorestamento não encontrada." });
      }
      return res.status(200).json(area);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar área de reflorestamento por ID.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedArea = await reflorestationService.update(id, updates);
      if (!updatedArea) {
        return res.status(404).json({ message: "Área de reflorestamento não encontrada para atualização." });
      }
      return res.status(200).json(updatedArea);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar área de reflorestamento.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await reflorestationService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Área de reflorestamento não encontrada para exclusão." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar área de reflorestamento.");
    }
  },
};
