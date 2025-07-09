import { Request, Response } from "express";
import { eventParticipantService } from "../service/eventParticipantService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const eventParticipantController = {
  // Registrar um usuário em um evento
  register: async (req: AuthenticatedRequest, res: Response) => {
    const { eventId } = req.body;
    const userId = req.user?.id; // Pega o ID do usuário autenticado do token

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const participantData = {
        eventId,
        userId,
        // Status será 'registered' por padrão no modelo
      };

      const newParticipation = await eventParticipantService.register(participantData);
      return res.status(201).json(newParticipation);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a duplicação, retorna 409 Conflict
        if (error.message === "Usuário já registrado neste evento.") {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao registrar participação.");
    }
  },

  // Listar todos os participantes de todos os eventos (Restrito a gestores)
  findAll: async (req: Request, res: Response) => {
    try {
      const participations = await eventParticipantService.findAll();
      return res.status(200).json(participations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar participações.");
    }
  },

  // Listar participantes de um evento específico (Qualquer usuário autenticado)
  findByEventId: async (req: Request, res: Response) => {
    const { eventId } = req.params;
    try {
      const participations = await eventParticipantService.findByEventId(eventId);
      if (!participations || participations.length === 0) {
        return res.status(404).json({ message: "Nenhuma participação encontrada para este evento." });
      }
      return res.status(200).json(participations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar participações por ID do evento.");
    }
  },

  // Cancelar a participação de um usuário em um evento
  // Pode ser o próprio usuário ou um gestor
  cancel: async (req: AuthenticatedRequest, res: Response) => {
    const { eventId } = req.params;
    const userIdToDelete = req.params.userId || req.user?.id; // Pode ser o próprio usuário ou um userId fornecido por um gestor

    if (!userIdToDelete) {
      return res.status(400).json({ message: "ID do usuário para cancelar participação é obrigatório." });
    }

    try {
      // Verifica se o usuário logado é o próprio usuário da participação OU um gestor
      const loggedInUserId = req.user?.id;
      const loggedInUserRole = req.user?.role;

      if (loggedInUserRole !== 'gestor' && loggedInUserId !== userIdToDelete) {
        return res.status(403).json({ message: "Acesso negado: Você não tem permissão para cancelar esta participação." });
      }

      const deletedCount = await eventParticipantService.cancelParticipation(eventId, userIdToDelete);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Participação não encontrada para cancelamento." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao cancelar participação.");
    }
  },
};
