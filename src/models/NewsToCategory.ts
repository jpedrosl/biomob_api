import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface NewsToCategoryAttributes {
  id: string;
  newsId: string; // Foreign Key to News
  categoryId: string; // Foreign Key to NewsCategory
  createdAt?: Date;
}

export interface NewsToCategoryCreationAttributes extends Optional<NewsToCategoryAttributes, 'id' | 'createdAt'> {}

export interface NewsToCategoryInstance extends Model<NewsToCategoryAttributes, NewsToCategoryCreationAttributes>, NewsToCategoryAttributes {}

export const NewsToCategory = sequelize.define<NewsToCategoryInstance, NewsToCategoryAttributes>('NewsToCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  newsId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'news', // Nome da tabela de notícias em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se a notícia for deletada, suas categorias também
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'news_categories', // Nome da tabela de categorias de notícias em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se a categoria for deletada, as associações também serão removidas
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'news_to_categories', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT
  createdAt: 'created_at',
});

export default NewsToCategory;
