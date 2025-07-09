import { NewsMedia, NewsMediaCreationAttributes } from "../models/NewsMedia";
import { News } from "../models/News"; // Para incluir a notícia associada

export const newsMediaService = {
  // Método para criar uma nova mídia de notícia
  save: async (mediaData: NewsMediaCreationAttributes) => {
    const newMedia = await NewsMedia.create(mediaData);
    return newMedia;
  },

  // Método para buscar todas as mídias
  findAll: async () => {
    const media = await NewsMedia.findAll({
      include: [
        { model: News, as: 'News' } // Inclui a notícia associada
      ],
      order: [['createdAt', 'DESC']], // Ordena pelas mídias mais recentes
    });
    return media;
  },

  // Método para buscar mídias por ID de Notícia
  findByNewsId: async (newsId: string) => {
    const media = await NewsMedia.findAll({
      where: { newsId },
      order: [['displayOrder', 'ASC'], ['createdAt', 'ASC']], // Ordena por ordem de exibição e depois por criação
    });
    return media;
  },

  // Método para buscar uma mídia específica por ID
  findById: async (id: string) => {
    const media = await NewsMedia.findByPk(id, {
      include: [
        { model: News, as: 'News' }
      ],
    });
    return media;
  },

  // Método para atualizar uma mídia
  update: async (id: string, updates: Partial<NewsMediaCreationAttributes>) => {
    const media = await NewsMedia.findByPk(id);
    if (!media) {
      return null;
    }
    const updatedMedia = await media.update(updates);
    return updatedMedia;
  },

  // Método para deletar uma mídia
  deleteById: async (id: string) => {
    const deletedCount = await NewsMedia.destroy({
      where: { id },
    });
    return deletedCount;
  },
};
