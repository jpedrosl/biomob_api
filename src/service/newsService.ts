import { News, NewsCreationAttributes } from "../models/News";
import { User } from "../models/User"; // Para incluir o autor da notícia

export const newsService = {
  save: async (newsData: NewsCreationAttributes) => {
    // Pode adicionar lógica para garantir que o slug é único se não for garantido pelo DB ou validação
    const newNews = await News.create(newsData);
    return newNews;
  },

  findAll: async () => {
    const news = await News.findAll({
      include: [
        { model: User, as: 'Author' } // Inclui o autor da notícia
      ],
      order: [['publishedAt', 'DESC'], ['createdAt', 'DESC']], // Ordena por data de publicação (mais recentes primeiro)
    });
    return news;
  },

  findById: async (id: string) => {
    const newsItem = await News.findByPk(id, {
      include: [
        { model: User, as: 'Author' }
      ],
    });
    return newsItem;
  },

  findBySlug: async (slug: string) => {
    const newsItem = await News.findOne({
      where: { slug },
      include: [
        { model: User, as: 'Author' }
      ],
    });
    return newsItem;
  },

  update: async (id: string, updates: Partial<NewsCreationAttributes>) => {
    const newsItem = await News.findByPk(id);
    if (!newsItem) {
      return null;
    }
    const updatedNews = await newsItem.update(updates);
    return updatedNews;
  },

  deleteById: async (id: string) => {
    const deletedCount = await News.destroy({
      where: { id },
    });
    return deletedCount;
  },

  // Método para incrementar o contador de visualizações
  incrementViewCount: async (id: string) => {
    const newsItem = await News.findByPk(id);
    if (newsItem) {
      newsItem.viewCount = (newsItem.viewCount || 0) + 1;
      await newsItem.save();
    }
    return newsItem;
  }
};
