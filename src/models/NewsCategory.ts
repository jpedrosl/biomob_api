import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface NewsCategoryAttributes {
  id: string;
  name: string;
  slug: string; // Unique, URL-friendly version of the name
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewsCategoryCreationAttributes extends Optional<NewsCategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface NewsCategoryInstance extends Model<NewsCategoryAttributes, NewsCategoryCreationAttributes>, NewsCategoryAttributes {}

export const NewsCategory = sequelize.define<NewsCategoryInstance, NewsCategoryAttributes>('NewsCategory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'news_categories', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default NewsCategory;
