import { GardenPlot, GardenPlotCreationAttributes } from "../models/GardenPlot";
import { User } from "../models/User"; // Importa o modelo User para include
import { CommunityGarden } from "../models/CommunityGarden"; // Importa o modelo CommunityGarden para include

export const gardenPlotService = {
  save: async (plotData: GardenPlotCreationAttributes) => {
    const newPlot = await GardenPlot.create(plotData);
    return newPlot;
  },

  findAll: async () => {
    const plots = await GardenPlot.findAll({
      include: [
        { model: CommunityGarden, as: 'Garden' }, // Inclui a horta comunitária associada
        { model: User, as: 'AssignedUser' } // Inclui o usuário atribuído
      ]
    });
    return plots;
  },

  findById: async (id: string) => {
    const plot = await GardenPlot.findByPk(id, {
      include: [
        { model: CommunityGarden, as: 'Garden' },
        { model: User, as: 'AssignedUser' }
      ]
    });
    return plot;
  },

  findByGardenId: async (gardenId: string) => {
    const plots = await GardenPlot.findAll({
      where: { gardenId },
      include: [
        { model: User, as: 'AssignedUser' }
      ],
      order: [['plotNumber', 'ASC']], // Ordena por número do lote
    });
    return plots;
  },

  update: async (id: string, updates: Partial<GardenPlotCreationAttributes>) => {
    const plot = await GardenPlot.findByPk(id);
    if (!plot) {
      return null;
    }
    const updatedPlot = await plot.update(updates);
    return updatedPlot;
  },

  deleteById: async (id: string) => {
    const deletedCount = await GardenPlot.destroy({
      where: { id },
    });
    return deletedCount; // Retorna o número de registros deletados (0 ou 1)
  },
};
