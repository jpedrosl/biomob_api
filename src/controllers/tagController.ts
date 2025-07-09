import { Request, Response } from "express";
import { tagService } from "../service/tagService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const tagController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { name, slug } = req.body;

    try {
      const tagData = {
        name,
        slug,
      };

      const newTag = await tagService.save(tagData);
      return res.status(201).json(newTag);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a unicidade do slug, retorna 409 Conflict
        if (error.message.includes("slug da tag já existe")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar tag.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const tags = await tagService.findAll();
      return res.status(200).json(tags);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar tags.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const tag = await tagService.findById(id);
      if (!tag) {
        return res.status(404).json({ message: "Tag não encontrada." });
      }
      return res.status(200).json(tag);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar tag por ID.");
    }
  },

  findBySlug: async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const tag = await tagService.findBySlug(slug);
      if (!tag) {
        return res.status(404).json({ message: "Tag não encontrada." });
      }
      return res.status(200).json(tag);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar tag por slug.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedTag = await tagService.update(id, updates);
      if (!updatedTag) {
        return res.status(404).json({ message: "Tag não encontrada para atualização." });
      }
      return res.status(200).json(updatedTag);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a unicidade do slug, retorna 409 Conflict
        if (error.message.includes("slug da tag já existe")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar tag.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await tagService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Tag não encontrada para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar tag.");
    }
  },
};
