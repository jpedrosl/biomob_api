import { Tag, TagCreationAttributes } from "../models/Tag";

export const tagService = {
  save: async (tagData: TagCreationAttributes) => {
    // Verificar se o slug já existe antes de criar
    const existingTag = await Tag.findOne({
      where: { slug: tagData.slug }
    });

    if (existingTag) {
      throw new Error("O slug da tag já existe.");
    }

    const newTag = await Tag.create(tagData);
    return newTag;
  },

  findAll: async () => {
    const tags = await Tag.findAll({
      order: [['name', 'ASC']], // Ordena por nome
    });
    return tags;
  },

  findById: async (id: string) => {
    const tag = await Tag.findByPk(id);
    return tag;
  },

  findBySlug: async (slug: string) => {
    const tag = await Tag.findOne({
      where: { slug },
    });
    return tag;
  },

  update: async (id: string, updates: Partial<TagCreationAttributes>) => {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return null;
    }

    // Se o slug for atualizado, verificar unicidade
    if (updates.slug && updates.slug !== tag.slug) {
      const existingSlug = await Tag.findOne({
        where: { slug: updates.slug }
      });
      if (existingSlug && existingSlug.id !== id) {
        throw new Error("O novo slug da tag já existe.");
      }
    }

    const updatedTag = await tag.update(updates);
    return updatedTag;
  },

  deleteById: async (id: string) => {
    const deletedCount = await Tag.destroy({
      where: { id },
    });
    return deletedCount;
  },
};
