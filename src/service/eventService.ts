import { Event, EventCreationAttributes } from "../models/Event";
import { User } from "../models/User"; // Para incluir o criador do evento
import { ReflorestationAreas } from "../models/ReflorestationAreas"; // Para incluir a área de reflorestamento
import { CommunityGarden } from "../models/CommunityGarden"; // Para incluir a horta comunitária

export const eventService = {
  save: async (eventData: EventCreationAttributes) => {
    // Conversão das coordenadas para o formato GeoJSON POINT
    const coordinates = (eventData.coordinates && Array.isArray(eventData.coordinates) && eventData.coordinates.length === 2)
      ? { type: 'Point', coordinates: eventData.coordinates } 
      : undefined;

    const newEvent = await Event.create({
      ...eventData,
      coordinates: coordinates,
    });
    return newEvent;
  },

  findAll: async () => {
    const events = await Event.findAll({
      include: [
        { model: User, as: 'CreatedByUser' }, 
        { model: ReflorestationAreas, as: 'ReflorestationArea' },
        { model: CommunityGarden, as: 'Garden' },
      ],
      order: [['startDate', 'ASC']], // Ordena eventos por data de início
    });
    return events;
  },

  findById: async (id: string) => {
    const event = await Event.findByPk(id, {
      include: [
        { model: User, as: 'CreatedByUser' },
        { model: ReflorestationAreas, as: 'ReflorestationArea' },
        { model: CommunityGarden, as: 'Garden' },
      ],
    });
    return event;
  },

  update: async (id: string, updates: Partial<EventCreationAttributes>) => {
    const event = await Event.findByPk(id);
    if (!event) {
      return null;
    }

    // Lida com a atualização das coordenadas
    if (updates.coordinates && Array.isArray(updates.coordinates) && updates.coordinates.length === 2) {
        updates.coordinates = { type: 'Point', coordinates: updates.coordinates };
    } else if (updates.coordinates === null) {
        updates.coordinates = undefined;
    }

    const updatedEvent = await event.update(updates);
    return updatedEvent;
  },

  deleteById: async (id: string) => {
    const deletedCount = await Event.destroy({
      where: { id },
    });
    return deletedCount; 
  },
};
