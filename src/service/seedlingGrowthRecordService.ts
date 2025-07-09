import { SeedlingGrowthRecord, SeedlingGrowthRecordCreationAttributes } from "../models/SeedlingGrowthRecord";

export const seedlingGrowthRecordService = {
  save: async (recordData: SeedlingGrowthRecordCreationAttributes) => {
    const newRecord = await SeedlingGrowthRecord.create(recordData);
    return newRecord;
  },

  findAll: async () => {
    const records = await SeedlingGrowthRecord.findAll();
    return records;
  },

  findById: async (id: string) => {
    const record = await SeedlingGrowthRecord.findByPk(id);
    return record;
  },

  findBySeedlingId: async (seedlingId: string) => {
    const records = await SeedlingGrowthRecord.findAll({
      where: { seedlingId },
      order: [['recordDate', 'ASC']], // Ordena por data de registro crescente
    });
    return records;
  },

  deleteById: async (id: string) => {
    const deletedCount = await SeedlingGrowthRecord.destroy({
      where: { id },
    });
    return deletedCount; // Retorna o número de registros deletados (0 ou 1)
  },
};
