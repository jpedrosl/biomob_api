import { Request, Response } from "express";
import { newsToCategoryService } from "../service/newsToCategoryService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsToCategoryController = {
  // Criar uma nova associação entre notícia e categoria
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { newsId, categoryId } = req.body;

    try {
      const associationData = { newsId, categoryId };
      const newAssociation = await newsToCategoryService.associate(associationData);
      return res.status(201).json(newAssociation);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a duplicação, retorna 409 Conflict
        if (error.message.includes("já está associada")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar associação notícia-categoria.");
    }
  },

  // Listar todas as associações (pode ser restrito a gestores na rota)
  findAll: async (req: Request, res: Response) => {
    try {
      const associations = await newsToCategoryService.findAll();
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar associações notícia-categoria.");
    }
  },

  // Buscar associações por ID da notícia (visualização por qualquer usuário autenticado)
  findByNewsId: async (req: Request, res: Response) => {
    const { newsId } = req.params;
    try {
      const associations = await newsToCategoryService.findByNewsId(newsId);
      if (!associations || associations.length === 0) {
        return res.status(404).json({ message: "Nenhuma categoria encontrada para esta notícia." });
      }
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar categorias por ID da notícia.");
    }
  },

  // Buscar associações por ID da categoria (visualização por qualquer usuário autenticado)
  findByCategoryId: async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
      const associations = await newsToCategoryService.findByCategoryId(categoryId);
      if (!associations || associations.length === 0) {
        return res.status(404).json({ message: "Nenhuma notícia encontrada para esta categoria." });
      }
      return res.status(200).json(associations);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar notícias por ID da categoria.");
    }
  },

  // Remover uma associação específica
  remove: async (req: Request, res: Response) => {
    const { newsId, categoryId } = req.params; // Assume que ambos IDs vêm como parâmetros de rota

    try {
      const deletedCount = await newsToCategoryService.removeAssociation(newsId, categoryId);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Associação notícia-categoria não encontrada para exclusão." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao remover associação notícia-categoria.");
    }
  },
};
