import { Request, Response } from "express";
import { newsMediaService } from "../service/newsMediaService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsMediaController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      newsId,
      fileUrl,
      fileType,
      caption,
      displayOrder,
    } = req.body;

    try {
      const mediaData = {
        newsId,
        fileUrl,
        fileType,
        caption,
        displayOrder,
      };

      const newMedia = await newsMediaService.save(mediaData);
      return res.status(201).json(newMedia);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar mídia de notícia.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const media = await newsMediaService.findAll();
      return res.status(200).json(media);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar mídias de notícia.");
    }
  },

  findByNewsId: async (req: Request, res: Response) => {
    const { newsId } = req.params;
    try {
      const media = await newsMediaService.findByNewsId(newsId);
      if (!media || media.length === 0) {
        return res.status(404).json({ message: "Nenhuma mídia encontrada para esta notícia." });
      }
      return res.status(200).json(media);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar mídias por ID da notícia.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const media = await newsMediaService.findById(id);
      if (!media) {
        return res.status(404).json({ message: "Mídia de notícia não encontrada." });
      }
      return res.status(200).json(media);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar mídia de notícia por ID.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedMedia = await newsMediaService.update(id, updates);
      if (!updatedMedia) {
        return res.status(404).json({ message: "Mídia de notícia não encontrada para atualização." });
      }
      return res.status(200).json(updatedMedia);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar mídia de notícia.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await newsMediaService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Mídia de notícia não encontrada para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar mídia de notícia.");
    }
  },
};
