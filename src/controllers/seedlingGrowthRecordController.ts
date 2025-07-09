import { Request, Response } from "express";
import { seedlingGrowthRecordService } from "../service/seedlingGrowthRecordService";
import { AuthenticatedRequest } from "../middlewares/auth"; // Importa a interface para ter acesso a req.user

export const seedlingGrowthRecordController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { seedlingId, recordDate, height, healthStatus, notes, photoUrl } = req.body;
    const recordedBy = req.user?.id; // Pega o ID do usuário autenticado do token

    if (!recordedBy) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }

    try {
      const recordData = {
        seedlingId,
        recordDate,
        height,
        healthStatus,
        notes,
        photoUrl,
        recordedBy,
      };

      const newRecord = await seedlingGrowthRecordService.save(recordData);
      return res.status(201).json(newRecord);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao criar registro de crescimento.");
    }
  },

  findAll: async (req: Request, res: Response) => {
    try {
      const records = await seedlingGrowthRecordService.findAll();
      return res.status(200).json(records);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar registros de crescimento.");
    }
  },

  findBySeedlingId: async (req: Request, res: Response) => {
    const { seedlingId } = req.params;

    try {
      const records = await seedlingGrowthRecordService.findBySeedlingId(seedlingId);
      if (!records || records.length === 0) {
        return res.status(404).json({ message: "Nenhum registro de crescimento encontrado para esta muda." });
      }
      return res.status(200).json(records);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao buscar registros de crescimento por ID da muda.");
    }
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const deletedCount = await seedlingGrowthRecordService.deleteById(id);
      if (deletedCount === 0) {
        return res.status(404).json({ message: "Registro de crescimento não encontrado." });
      }
      return res.status(204).send(); // 204 No Content para deleção bem-sucedida
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao deletar registro de crescimento.");
    }
  },
};
