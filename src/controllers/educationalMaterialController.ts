import { Request, Response } from "express";
import { educationalMaterialService } from "../service/educationalMaterialService";
import { AuthenticatedRequest } from "../middlewares/auth";

export const educationalMaterialController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      title,
      description,
      materialType,
      fileUrl,
      category,
    } = req.body;
    const uploadedBy = req.user?.id; // Pega o ID do usuário autenticado (gestor) do token

    if (!uploadedBy) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const materialData = {
        title,
        description,
        materialType,
        fileUrl,
        category,
        uploadedBy,
      };

      const newMaterial = await educationalMaterialService.save(materialData);
      return res.status(201).json(newMaterial);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar material educativo.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const materials = await educationalMaterialService.findAll();
      return res.status(200).json(materials);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar materiais educativos.");
    }
  },

  findById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const material = await educationalMaterialService.findById(id);
      if (!material) {
        return res.status(404).json({ message: "Material educativo não encontrado." });
      }
      return res.status(200).json(material);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar material educativo por ID.");
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updates = req.body; 

    try {
      const updatedMaterial = await educationalMaterialService.update(id, updates);
      if (!updatedMaterial) {
        return res.status(404).json({ message: "Material educativo não encontrado para atualização." });
      }
      return res.status(200).json(updatedMaterial);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao atualizar material educativo.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCount = await educationalMaterialService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Material educativo não encontrado para exclusão." });
      }
      return res.status(204).send(); 
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar material educativo.");
    }
  },

  // Rota para incrementar o contador de downloads (acessível publicamente ou por qualquer usuário)
  incrementDownload: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const material = await educationalMaterialService.incrementDownloadCount(id);
      if (!material) {
        return res.status(404).json({ message: "Material educativo não encontrado." });
      }
      return res.status(200).json({ downloadCount: material.downloadCount });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao incrementar contador de downloads.");
    }
  },
};
