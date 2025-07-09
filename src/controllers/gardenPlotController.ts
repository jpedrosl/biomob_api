import { Request, Response } from "express";
import { gardenPlotService } from "../service/gardenPlotService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const gardenPlotController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { gardenId, plotNumber, size, assignedTo, currentCrops, notes } = req.body;

    try {
      const plotData = {
        gardenId,
        plotNumber,
        size,
        assignedTo,
        currentCrops,
        notes,
      };

      const newPlot = await gardenPlotService.save(plotData);
      return res.status(201).json(newPlot);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar lote de horta.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const plots = await gardenPlotService.findAll();
      return res.status(200).json(plots);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar lotes de horta.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const plot = await gardenPlotService.findById(id);
      if (!plot) {
        return res.status(404).json({ message: "Lote de horta não encontrado." });
      }
      return res.status(200).json(plot);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar lote de horta por ID.");
    }
  },

  findByGardenId: async (req: Request, res: Response) => {
    const { gardenId } = req.params;
    try {
      const plots = await gardenPlotService.findByGardenId(gardenId);
      if (!plots || plots.length === 0) {
        return res.status(404).json({ message: "Nenhum lote encontrado para esta horta comunitária." });
      }
      return res.status(200).json(plots);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar lotes por ID da horta.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedPlot = await gardenPlotService.update(id, updates);
      if (!updatedPlot) {
        return res.status(404).json({ message: "Lote de horta não encontrado para atualização." });
      }
      return res.status(200).json(updatedPlot);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar lote de horta.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await gardenPlotService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Lote de horta não encontrado para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar lote de horta.");
    }
  },
};
