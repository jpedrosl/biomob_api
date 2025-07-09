import { NewsCategory, NewsCategoryCreationAttributes } from "../models/NewsCategory";

export const newsCategoryService = {
  save: async (categoryData: NewsCategoryCreationAttributes) => {
    // Verificar se o slug já existe antes de criar
    const existingCategory = await NewsCategory.findOne({
      where: { slug: categoryData.slug }
    });

    if (existingCategory) {
      throw new Error("O slug da categoria já existe.");
    }

    const newCategory = await NewsCategory.create(categoryData);
    return newCategory;
  },

  findAll: async () => {
    const categories = await NewsCategory.findAll({
      order: [['name', 'ASC']], // Ordena por nome
    });
    return categories;
  },

  findById: async (id: string) => {
    const category = await NewsCategory.findByPk(id);
    return category;
  },

  findBySlug: async (slug: string) => {
    const category = await NewsCategory.findOne({
      where: { slug },
    });
    return category;
  },

  update: async (id: string, updates: Partial<NewsCategoryCreationAttributes>) => {
    const category = await NewsCategory.findByPk(id);
    if (!category) {
      return null;
    }

    // Se o slug for atualizado, verificar unicidade
    if (updates.slug && updates.slug !== category.slug) {
      const existingSlug = await NewsCategory.findOne({
        where: { slug: updates.slug }
      });
      if (existingSlug && existingSlug.id !== id) {
        throw new Error("O novo slug da categoria já existe.");
      }
    }

    const updatedCategory = await category.update(updates);
    return updatedCategory;
  },

  deleteById: async (id: string) => {
    const deletedCount = await NewsCategory.destroy({
      where: { id },
    });
    return deletedCount;
  },
};
