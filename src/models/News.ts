import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface NewsAttributes {
  id: string;
  title: string;
  slug: string; // Unique, URL-friendly version of the title
  content: string;
  summary?: string;
  coverImageUrl?: string;
  authorId: string; // Foreign Key to Users
  published?: boolean;
  publishedAt?: Date;
  viewCount?: number;
  featured?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewsCreationAttributes extends Optional<NewsAttributes, 'id' | 'published' | 'publishedAt' | 'viewCount' | 'featured' | 'createdAt' | 'updatedAt'> {}

export interface NewsInstance extends Model<NewsAttributes, NewsCreationAttributes>, NewsAttributes {}

export const News = sequelize.define<NewsInstance, NewsAttributes>('News', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  coverImageUrl: {
    type: DataTypes.TEXT, // Usamos TEXT para URLs
    allowNull: true,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela de usuários
      key: 'id',
    },
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  publishedAt: {
    type: DataTypes.DATE,
    allowNull: true, // Pode ser null se não publicado ainda
  },
  viewCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
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
  tableName: 'news', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default News;
