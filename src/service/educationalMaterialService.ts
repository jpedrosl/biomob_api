import { EducationalMaterial, EducationalMaterialCreationAttributes } from "../models/EducationalMaterial";
import { User } from "../models/User"; // Para incluir o usuário que fez o upload

export const educationalMaterialService = {
  save: async (materialData: EducationalMaterialCreationAttributes) => {
    const newMaterial = await EducationalMaterial.create(materialData);
    return newMaterial;
  },

  findAll: async () => {
    const materials = await EducationalMaterial.findAll({
      include: [
        { model: User, as: 'UploadedBy' } // Inclui o usuário que fez o upload
      ],
      order: [['createdAt', 'DESC']], // Ordena pelos materiais mais recentes
    });
    return materials;
  },

  findById: async (id: string) => {
    const material = await EducationalMaterial.findByPk(id, {
      include: [
        { model: User, as: 'UploadedBy' }
      ],
    });
    return material;
  },

  update: async (id: string, updates: Partial<EducationalMaterialCreationAttributes>) => {
    const material = await EducationalMaterial.findByPk(id);
    if (!material) {
      return null;
    }
    const updatedMaterial = await material.update(updates);
    return updatedMaterial;
  },

  deleteById: async (id: string) => {
    const deletedCount = await EducationalMaterial.destroy({
      where: { id },
    });
    return deletedCount; 
  },

  // Método para incrementar o contador de downloads (se necessário)
  incrementDownloadCount: async (id: string) => {
    const material = await EducationalMaterial.findByPk(id);
    if (material) {
      material.downloadCount = (material.downloadCount || 0) + 1;
      await material.save();
    }
    return material;
  }
};
