import { EventParticipant, EventParticipantCreationAttributes } from "../models/EventParticipant";
import { User } from "../models/User"; // Para incluir o usuário participante
import { Event } from "../models/Event"; // Para incluir o evento

export const eventParticipantService = {
  // Método para registrar um participante em um evento
  register: async (participantData: EventParticipantCreationAttributes) => {
    // Verificação opcional para evitar duplicações
    const existingParticipation = await EventParticipant.findOne({
      where: {
        eventId: participantData.eventId,
        userId: participantData.userId
      }
    });

    if (existingParticipation) {
      throw new Error("Usuário já registrado neste evento.");
    }

    const newParticipation = await EventParticipant.create(participantData);
    return newParticipation;
  },

  // Método para buscar todos os participantes (pode ser restrito a gestores na rota)
  findAll: async () => {
    const participations = await EventParticipant.findAll({
      include: [
        { model: User, as: 'User' },
        { model: Event, as: 'Event' }
      ]
    });
    return participations;
  },

  // Método para buscar participantes por ID do evento
  findByEventId: async (eventId: string) => {
    const participations = await EventParticipant.findAll({
      where: { eventId },
      include: [
        { model: User, as: 'User' } // Inclui o usuário participante
      ]
    });
    return participations;
  },

  // Método para buscar uma participação específica por evento e usuário
  findByEventAndUser: async (eventId: string, userId: string) => {
    const participation = await EventParticipant.findOne({
      where: { eventId, userId },
      include: [
        { model: User, as: 'User' },
        { model: Event, as: 'Event' }
      ]
    });
    return participation;
  },

  // Método para cancelar/remover uma participação (usuário ou gestor)
  cancelParticipation: async (eventId: string, userId: string) => {
    const deletedCount = await EventParticipant.destroy({
      where: { eventId, userId },
    });
    return deletedCount; // Retorna 1 se deletou, 0 se não encontrou
  },
};
