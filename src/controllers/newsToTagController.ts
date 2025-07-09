import { Request, Response } from "express";
import { newsToTagService } from "../service/newsToTagService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsToTagController = {
  // Criar uma nova associação entre notícia e tag
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { newsId, tagId } = req.body;

    try {
      const associationData = { newsId, tagId };
      const newAssociation = await newsToTagService.associate(associationData);
      return res.status(201).json(newAssociation);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a duplicação, retorna 409 Conflict
        if (error.message.includes("já está associada")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar associação notícia-tag.");
    }
  },

  // Listar todas as associações (pode ser restrito a gestores na rota)
  findAll: async (req: Request, res: Response) => {
    try {
      const associations = await newsToTagService.findAll();
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar associações notícia-tag.");
    }
  },

  // Buscar associações por ID da notícia (visualização por qualquer usuário autenticado)
  findByNewsId: async (req: Request, res: Response) => {
    const { newsId } = req.params;
    try {
      const associations = await newsToTagService.findByNewsId(newsId);
      if (!associations || associations.length === 0) {
        return res.status(404).json({ message: "Nenhuma tag encontrada para esta notícia." });
      }
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar tags por ID da notícia.");
    }
  },

  // Buscar associações por ID da tag (visualização por qualquer usuário autenticado)
  findByTagId: async (req: Request, res: Response) => {
    const { tagId } = req.params;
    try {
      const associations = await newsToTagService.findByTagId(tagId);
      if (!associations || associations.length === 0) {
        return res.status(404).json({ message: "Nenhuma notícia encontrada para esta tag." });
      }
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar notícias por ID da tag.");
    }
  },

  // Remover uma associação específica
  remove: async (req: Request, res: Response) => {
    const { newsId, tagId } = req.params; // Assume que ambos IDs vêm como parâmetros de rota

    try {
      const deletedCount = await newsToTagService.removeAssociation(newsId, tagId);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Associação notícia-tag não encontrada para exclusão." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao remover associação notícia-tag.");
    }
  },
};
