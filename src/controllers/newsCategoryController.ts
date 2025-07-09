import { Request, Response } from "express";
import { newsCategoryService } from "../service/newsCategoryService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const newsCategoryController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { name, slug, description } = req.body;

    try {
      const categoryData = {
        name,
        slug,
        description,
      };

      const newCategory = await newsCategoryService.save(categoryData);
      return res.status(201).json(newCategory);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a unicidade do slug, retorna 409 Conflict
        if (error.message.includes("slug da categoria já existe")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar categoria de notícia.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const categories = await newsCategoryService.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar categorias de notícia.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await newsCategoryService.findById(id);
      if (!category) {
        return res.status(404).json({ message: "Categoria de notícia não encontrada." });
      }
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar categoria de notícia por ID.");
    }
  },

  findBySlug: async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
      const category = await newsCategoryService.findBySlug(slug);
      if (!category) {
        return res.status(404).json({ message: "Categoria de notícia não encontrada." });
      }
      return res.status(200).json(category);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar categoria de notícia por slug.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedCategory = await newsCategoryService.update(id, updates);
      if (!updatedCategory) {
        return res.status(404).json({ message: "Categoria de notícia não encontrada para atualização." });
      }
      return res.status(200).json(updatedCategory);
    } catch (error) {
      if (error instanceof Error) {
        // Se o erro for a unicidade do slug, retorna 409 Conflict
        if (error.message.includes("slug da categoria já existe")) {
          return res.status(409).json({ message: error.message });
        }
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar categoria de notícia.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await newsCategoryService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Categoria de notícia não encontrada para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar categoria de notícia.");
    }
  },
};
