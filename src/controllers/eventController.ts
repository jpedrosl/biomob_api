import { Request, Response } from "express";
import { eventService } from "../service/eventService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const eventController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      title,
      description,
      eventType,
      startDate,
      endDate,
      location,
      coordinates, // Virá como array [longitude, latitude] do body
      reforestationAreaId,
      gardenId,
    } = req.body;
    const createdBy = req.user?.id; // Pega o ID do usuário autenticado do token

    if (!createdBy) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const eventData = {
        title,
        description,
        eventType,
        startDate,
        endDate,
        location,
        coordinates,
        reforestationAreaId,
        gardenId,
        createdBy,
      };

      const newEvent = await eventService.save(eventData);
      return res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar evento.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const events = await eventService.findAll();
      return res.status(200).json(events);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar eventos.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const event = await eventService.findById(id);
      if (!event) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }
      return res.status(200).json(event);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar evento por ID.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedEvent = await eventService.update(id, updates);
      if (!updatedEvent) {
        return res.status(404).json({ message: "Evento não encontrado para atualização." });
      }
      return res.status(200).json(updatedEvent);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar evento.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await eventService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Evento não encontrado para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar evento.");
    }
  },
};
