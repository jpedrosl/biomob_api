import { Request, Response } from "express";
import { newsService } from "../service/newsService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      title,
      slug,
      content,
      summary,
      coverImageUrl,
      published,
      publishedAt,
    } = req.body;
    const authorId = req.user?.id; // Pega o ID do usuário autenticado (gestor) do token

    if (!authorId) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      // O slug deve ser único, verificar se já existe
      const existingNews = await newsService.findBySlug(slug);
      if (existingNews) {
        return res.status(409).json({ message: "O slug fornecido já existe. Por favor, escolha outro." });
      }

      const newsData = {
        title,
        slug,
        content,
        summary,
        coverImageUrl,
        authorId,
        published,
        publishedAt: published ? (publishedAt || new Date()) : null, // Se publicado, usa a data fornecida ou a data atual
      };

      const newNews = await newsService.save(newsData);
      return res.status(201).json(newNews);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar notícia.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const news = await newsService.findAll();
      return res.status(200).json(news);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar notícias.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const newsItem = await newsService.findById(id);
      if (!newsItem) {
        return res.status(404).json({ message: "Notícia não encontrada." });
      }
      return res.status(200).json(newsItem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar notícia por ID.");
    }
  },

  findBySlug: async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const newsItem = await newsService.findBySlug(slug);
      if (!newsItem) {
        return res.status(404).json({ message: "Notícia não encontrada." });
      }
      await newsService.incrementViewCount(newsItem.id); // Incrementa o contador de visualizações ao buscar por slug
      return res.status(200).json(newsItem);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar notícia por slug.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedNews = await newsService.update(id, updates);
      if (!updatedNews) {
        return res.status(404).json({ message: "Notícia não encontrada para atualização." });
      }
      return res.status(200).json(updatedNews);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar notícia.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await newsService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Notícia não encontrada para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar notícia.");
    }
  },
};
