import { NewsComment, NewsCommentCreationAttributes } from "../models/NewsComment";
import { User } from "../models/User"; // Para incluir o autor do comentário
import { News } from "../models/News"; // Para incluir a notícia associada

export const newsCommentService = {
  // Método para criar um novo comentário
  save: async (commentData: NewsCommentCreationAttributes) => {
    const newComment = await NewsComment.create(commentData);
    return newComment;
  },

  // Método para buscar todos os comentários (pode ser filtrado por aprovados)
  findAll: async (options?: { approvedOnly?: boolean }) => {
    const whereClause: any = {};
    if (options?.approvedOnly) {
      whereClause.approved = true;
    }

    const comments = await NewsComment.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'User' }, // Inclui o usuário que fez o comentário
        { model: News, as: 'News' }, // Inclui a notícia associada
        // Para comentários aninhados, você pode incluir recursivamente aqui se quiser buscar a árvore completa
        // { model: NewsComment, as: 'ParentComment', include: [{ model: User, as: 'User' }] }
      ],
      order: [['createdAt', 'ASC']], // Ordena os comentários do mais antigo para o mais novo
    });
    return comments;
  },

  // Método para buscar comentários de uma notícia específica
  findByNewsId: async (newsId: string, options?: { approvedOnly?: boolean }) => {
    const whereClause: any = { newsId };
    if (options?.approvedOnly) {
      whereClause.approved = true;
    }

    const comments = await NewsComment.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'User' },
        {
          model: NewsComment, // Para carregar respostas a este comentário
          as: 'Replies', // Alias para os comentários filhos
          separate: true, // Para garantir que os replies são carregados em uma query separada e aninhados corretamente
          order: [['createdAt', 'ASC']],
          include: [{ model: User, as: 'User' }] // Inclui o usuário dos replies
        }
      ],
      order: [['createdAt', 'ASC']],
    });
    return comments;
  },

  // Método para buscar um comentário específico por ID
  findById: async (id: string) => {
    const comment = await NewsComment.findByPk(id, {
      include: [
        { model: User, as: 'User' },
        { model: News, as: 'News' },
        {
          model: NewsComment,
          as: 'Replies',
          separate: true,
          order: [['createdAt', 'ASC']],
          include: [{ model: User, as: 'User' }]
        }
      ],
    });
    return comment;
  },

  // Método para atualizar um comentário
  update: async (id: string, updates: Partial<NewsCommentCreationAttributes>) => {
    const comment = await NewsComment.findByPk(id);
    if (!comment) {
      return null;
    }
    const updatedComment = await comment.update(updates);
    return updatedComment;
  },

  // Método para aprovar um comentário
  approveComment: async (id: string) => {
    const comment = await NewsComment.findByPk(id);
    if (!comment) {
      return null;
    }
    comment.approved = true;
    await comment.save();
    return comment;
  },

  // Método para deletar um comentário
  deleteById: async (id: string) => {
    const deletedCount = await NewsComment.destroy({
      where: { id },
    });
    return deletedCount;
  },
};
