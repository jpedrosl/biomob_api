import { CommunityGarden, CommunityGardenCreationAttributes } from "../models/CommunityGarden";

export const communityGardenService = {
  save: async (gardenData: CommunityGardenCreationAttributes) => {
    // Conversão das coordenadas para o formato GeoJSON POINT
    const location = (gardenData.latitude !== undefined && gardenData.longitude !== undefined) 
      ? { type: 'Point', coordinates: [gardenData.longitude, gardenData.latitude] } 
      : undefined; // CORRIGIDO: Usar undefined em vez de null

    // Conversão do polígono para o formato GeoJSON POLYGON
    const polygon = gardenData.polygon ? { type: 'Polygon', coordinates: gardenData.polygon } : undefined; // CORRIGIDO: Usar undefined em vez de null

    const newGarden = await CommunityGarden.create({
      ...gardenData,
      location: location,
      polygon: polygon,
    });
    return newGarden;
  },

  findAll: async () => {
    const gardens = await CommunityGarden.findAll();
    return gardens;
  },

  findById: async (id: string) => {
    const garden = await CommunityGarden.findByPk(id);
    return garden;
  },

  update: async (id: string, updates: Partial<CommunityGardenCreationAttributes>) => {
    const garden = await CommunityGarden.findByPk(id);
    if (!garden) {
      return null;
    }

    // Lida com a atualização de location e polygon
    // CORRIGIDO: Converter para undefined se for explicitamente null ou não definido
    if (updates.latitude !== undefined && updates.longitude !== undefined) {
      updates.location = { type: 'Point', coordinates: [updates.longitude, updates.latitude] };
    } else if (updates.latitude === null && updates.longitude === null) { // Se forem passados como null para remover
        updates.location = undefined;
    } else if (updates.location === null) { // Se location for passado como null
        updates.location = undefined;
    }
    
    if (updates.polygon) {
      updates.polygon = { type: 'Polygon', coordinates: updates.polygon };
    } else if (updates.polygon === null) { // CORRIGIDO: Se polygon for passado como null para remover
        updates.polygon = undefined;
    }

    const updatedGarden = await garden.update(updates);
    return updatedGarden;
  },

  deleteById: async (id: string) => {
    const deletedCount = await CommunityGarden.destroy({
      where: { id },
    });
    return deletedCount; 
  },
};
