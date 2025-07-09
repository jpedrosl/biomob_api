import { Request, Response } from "express";
import { newsCommentService } from "../service/newsCommentService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsCommentController = {
  // Criar um novo comentário
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { newsId, parentCommentId, content } = req.body;
    const userId = req.user?.id; // Pega o ID do usuário autenticado do token

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const commentData = {
        newsId,
        userId,
        parentCommentId,
        content,
        // approved será 'false' por padrão no modelo
      };

      const newComment = await newsCommentService.save(commentData);
      return res.status(201).json(newComment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar comentário.");
    }
  },

  // Listar todos os comentários (pode ser filtrado por aprovados)
  findAll: async (req: Request, res: Response) => {
    const { approvedOnly } = req.query; // Para filtrar apenas comentários aprovados

    try {
      const comments = await newsCommentService.findAll({ approvedOnly: approvedOnly === 'true' });
      return res.status(200).json(comments);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar comentários.");
    }
  },

  // Listar comentários de uma notícia específica
  findByNewsId: async (req: Request, res: Response) => {
    const { newsId } = req.params;
    const { approvedOnly } = req.query;

    try {
      const comments = await newsCommentService.findByNewsId(newsId, { approvedOnly: approvedOnly === 'true' });
      if (!comments || comments.length === 0) {
        return res.status(404).json({ message: "Nenhum comentário encontrado para esta notícia." });
      }
      return res.status(200).json(comments);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar comentários por ID da notícia.");
    }
  },

  // Buscar um comentário específico por ID
  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const comment = await newsCommentService.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado." });
      }
      return res.status(200).json(comment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar comentário por ID.");
    }
  },

  // Atualizar um comentário (restrito a gestores ou ao próprio autor)
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 
    const loggedInUserId = req.user?.id;
    const loggedInUserRole = req.user?.role;

    try {
      const comment = await newsCommentService.findById(id);
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado para atualização." });
      }

      // Lógica de autorização: Apenas gestores ou o próprio autor podem atualizar
      if (loggedInUserRole !== 'gestor' && comment.userId !== loggedInUserId) {
        return res.status(403).json({ message: "Acesso negado: Você não tem permissão para atualizar este comentário." });
      }

      const updatedComment = await newsCommentService.update(id, updates);
      return res.status(200).json(updatedComment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar comentário.");
    }
  },

  // Aprovar um comentário (restrito a gestores)
  approve: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const loggedInUserRole = req.user?.role;

    if (loggedInUserRole !== 'gestor') {
      return res.status(403).json({ message: "Acesso negado: Apenas gestores podem aprovar comentários." });
    }

    try {
      const approvedComment = await newsCommentService.approveComment(id);
      if (!approvedComment) {
        return res.status(404).json({ message: "Comentário não encontrado para aprovação." });
      }
      return res.status(200).json(approvedComment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao aprovar comentário.");
    }
  },

  // Deletar um comentário (restrito a gestores ou ao próprio autor)
  delete: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const loggedInUserId = req.user?.id;
    const loggedInUserRole = req.user?.role;

    try {
      const comment = await newsCommentService.findById(id); // Buscar para verificar userId
      if (!comment) {
        return res.status(404).json({ message: "Comentário não encontrado para exclusão." });
      }

      // Lógica de autorização: Apenas gestores ou o próprio autor podem deletar
      if (loggedInUserRole !== 'gestor' && comment.userId !== loggedInUserId) {
        return res.status(403).json({ message: "Acesso negado: Você não tem permissão para deletar este comentário." });
      }

      const deletedCount = await newsCommentService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Comentário não encontrado para exclusão (após verificação)." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar comentário.");
    }
  },
};
