import { NewsToCategory, NewsToCategoryCreationAttributes } from "../models/NewsToCategory";
import { News } from "../models/News"; // Para incluir a notícia
import { NewsCategory } from "../models/NewsCategory"; // Para incluir a categoria

export const newsToCategoryService = {
  // Método para associar uma notícia a uma categoria
  associate: async (associationData: NewsToCategoryCreationAttributes) => {
    // Opcional: Adicionar verificação para evitar associações duplicadas
    const existingAssociation = await NewsToCategory.findOne({
      where: {
        newsId: associationData.newsId,
        categoryId: associationData.categoryId
      }
    });

    if (existingAssociation) {
      throw new Error("Esta notícia já está associada a esta categoria.");
    }

    const newAssociation = await NewsToCategory.create(associationData);
    return newAssociation;
  },

  // Método para buscar todas as associações
  findAll: async () => {
    const associations = await NewsToCategory.findAll({
      include: [
        { model: News, as: 'News' }, 
        { model: NewsCategory, as: 'Category' } 
      ]
    });
    return associations;
  },

  // Método para buscar associações por ID da Notícia
  findByNewsId: async (newsId: string) => {
    const associations = await NewsToCategory.findAll({
      where: { newsId },
      include: [
        { model: NewsCategory, as: 'Category' } 
      ]
    });
    return associations;
  },

  // Método para buscar associações por ID da Categoria
  findByCategoryId: async (categoryId: string) => {
    const associations = await NewsToCategory.findAll({
      where: { categoryId },
      include: [
        { model: News, as: 'News' } 
      ]
    });
    return associations;
  },

  // Método para remover uma associação específica
  removeAssociation: async (newsId: string, categoryId: string) => {
    const deletedCount = await NewsToCategory.destroy({
      where: { newsId, categoryId },
    });
    return deletedCount; // Retorna 1 se deletou, 0 se não encontrou
  },

  // Método para remover todas as associações de uma notícia
  removeByNewsId: async (newsId: string) => {
    const deletedCount = await NewsToCategory.destroy({
      where: { newsId },
    });
    return deletedCount;
  },

  // Método para remover todas as associações de uma categoria
  removeByCategoryId: async (categoryId: string) => {
    const deletedCount = await NewsToCategory.destroy({
      where: { categoryId },
    });
    return deletedCount;
  },
};
