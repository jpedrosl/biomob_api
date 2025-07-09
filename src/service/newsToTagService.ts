import { NewsToTag, NewsToTagCreationAttributes } from "../models/NewsToTag";
import { News } from "../models/News"; 
import { Tag } from "../models/Tag"; 

export const newsToTagService = {
  // Método para associar uma notícia a uma tag
  associate: async (associationData: NewsToTagCreationAttributes) => {
    // Opcional: Adicionar verificação para evitar associações duplicadas
    const existingAssociation = await NewsToTag.findOne({
      where: {
        newsId: associationData.newsId,
        tagId: associationData.tagId
      }
    });

    if (existingAssociation) {
      throw new Error("Esta notícia já está associada a esta tag.");
    }

    const newAssociation = await NewsToTag.create(associationData);
    return newAssociation;
  },

  // Método para buscar todas as associações
  findAll: async () => {
    const associations = await NewsToTag.findAll({
      include: [
        { model: News, as: 'News' }, 
        { model: Tag, as: 'Tag' } 
      ]
    });
    return associations;
  },

  // Método para buscar associações por ID da Notícia
  findByNewsId: async (newsId: string) => {
    const associations = await NewsToTag.findAll({
      where: { newsId },
      include: [
        { model: Tag, as: 'Tag' } 
      ]
    });
    return associations;
  },

  // Método para buscar associações por ID da Tag
  findByTagId: async (tagId: string) => {
    const associations = await NewsToTag.findAll({
      where: { tagId },
      include: [
        { model: News, as: 'News' } 
      ]
    });
    return associations;
  },

  // Método para remover uma associação específica
  removeAssociation: async (newsId: string, tagId: string) => {
    const deletedCount = await NewsToTag.destroy({
      where: { newsId, tagId },
    });
    return deletedCount; 
  },

  // Método para remover todas as associações de uma notícia
  removeByNewsId: async (newsId: string) => {
    const deletedCount = await NewsToTag.destroy({
      where: { newsId },
    });
    return deletedCount;
  },

  // Método para remover todas as associações de uma tag
  removeByTagId: async (tagId: string) => {
    const deletedCount = await NewsToTag.destroy({
      where: { tagId },
    });
    return deletedCount;
  },
};
