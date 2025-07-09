import { ReflorestationAreas, ReflorestationAreasCreationAttributes } from "../models/ReflorestationAreas";
import { Op } from 'sequelize'; // Para operadores de query como LIKE, se for usar em buscas futuras

export const reflorestationService = {
  save: async (reflorestationData: ReflorestationAreasCreationAttributes) => {
    let polygonGeoJson: { type: 'Polygon'; coordinates: number[][][]; } | undefined;

    // Verifica se reflorestationData.polygon existe e tem a estrutura esperada para GeoJSON
    if (reflorestationData.polygon && typeof reflorestationData.polygon === 'object' && 'coordinates' in reflorestationData.polygon && Array.isArray(reflorestationData.polygon.coordinates) && reflorestationData.polygon.coordinates.length > 0) {
        polygonGeoJson = {
            type: 'Polygon',
            coordinates: reflorestationData.polygon.coordinates // Acessa a propriedade 'coordinates' que é a array
        };
    } else if (Array.isArray(reflorestationData.polygon) && reflorestationData.polygon.length > 0 && Array.isArray(reflorestationData.polygon[0])) {
        // Caso o input venha como array diretamente (do yup schema talvez), converte para o formato esperado
        polygonGeoJson = {
            type: 'Polygon',
            coordinates: reflorestationData.polygon as number[][][]
        };
    }

    const newReflorestationArea = await ReflorestationAreas.create({
      ...reflorestationData,
      polygon: polygonGeoJson, // Atribui o objeto GeoJSON corretamente tipado
    });
    return newReflorestationArea;
  },

  findAll: async () => {
    const areas = await ReflorestationAreas.findAll({
      order: [['name', 'ASC']],
    });
    return areas;
  },

  findById: async (id: string) => {
    const area = await ReflorestationAreas.findByPk(id);
    return area;
  },

  update: async (id: string, updates: Partial<ReflorestationAreasCreationAttributes>) => {
    const area = await ReflorestationAreas.findByPk(id);
    if (!area) {
      return null;
    }

    // Lida com a atualização do polígono da mesma forma
    if (updates.polygon !== undefined) {
        let updatedPolygonGeoJson: { type: 'Polygon'; coordinates: number[][][]; } | undefined;
        if (updates.polygon && typeof updates.polygon === 'object' && 'coordinates' in updates.polygon && Array.isArray(updates.polygon.coordinates) && updates.polygon.coordinates.length > 0) {
            updatedPolygonGeoJson = {
                type: 'Polygon',
                coordinates: updates.polygon.coordinates // Acessa a propriedade 'coordinates' que é a array
            };
        } else if (Array.isArray(updates.polygon) && updates.polygon.length > 0 && Array.isArray(updates.polygon[0])) {
             updatedPolygonGeoJson = {
                type: 'Polygon',
                coordinates: updates.polygon as number[][][]
            };
        }
        (updates as any).polygon = updatedPolygonGeoJson; // Atribui o objeto GeoJSON tipado corretamente
    }

    const updatedArea = await area.update(updates);
    return updatedArea;
  },

  deleteById: async (id: string) => {
    const deletedCount = await ReflorestationAreas.destroy({
      where: { id },
    });
    return deletedCount;
  },
};
