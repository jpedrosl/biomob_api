import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface TagAttributes {
  id: string;
  name: string;
  slug: string; // Unique, URL-friendly version of the name
  createdAt?: Date;
}

export interface TagCreationAttributes extends Optional<TagAttributes, 'id' | 'createdAt'> {}

export interface TagInstance extends Model<TagAttributes, TagCreationAttributes>, TagAttributes {}

export const Tag = sequelize.define<TagInstance, TagAttributes>('Tag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  slug: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'tags', // Nome da tabela em minúsculas
  timestamps: true, // Apenas createdAt, mas Sequelize precisa do 'true' para gerenciar
  createdAt: 'created_at',
  updatedAt: false, // Explicitamente desativado para updatedAt, pois não existe na tabela
});

export default Tag;
