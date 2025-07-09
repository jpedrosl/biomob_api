import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface NewsToTagAttributes {
  id: string;
  newsId: string; // Foreign Key to News
  tagId: string; // Foreign Key to Tags
  createdAt?: Date;
}

export interface NewsToTagCreationAttributes extends Optional<NewsToTagAttributes, 'id' | 'createdAt'> {}

export interface NewsToTagInstance extends Model<NewsToTagAttributes, NewsToTagCreationAttributes>, NewsToTagAttributes {}

export const NewsToTag = sequelize.define<NewsToTagInstance, NewsToTagAttributes>('NewsToTag', {
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
      model: 'news', // Nome da tabela de notícias em maiúsculas
      key: 'id',
    },
    onDelete: 'cascade', 
  },
  tagId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tags', // Nome da tabela de tags em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se a tag for deletada, as associações também serão removidas
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'news_to_tags', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT
  createdAt: 'created_at',
});

export default NewsToTag;
