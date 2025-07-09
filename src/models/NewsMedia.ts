import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface NewsMediaAttributes {
  id: string;
  newsId: string; // Foreign Key to News
  fileUrl: string; // URL para o arquivo de mídia
  fileType?: string; // e.g., 'image', 'video'
  caption?: string; // Descrição da mídia
  displayOrder?: number; // Ordem de exibição (se houver várias mídias para uma notícia)
  createdAt?: Date;
}

export interface NewsMediaCreationAttributes extends Optional<NewsMediaAttributes, 'id' | 'fileType' | 'caption' | 'displayOrder' | 'createdAt'> {}

export interface NewsMediaInstance extends Model<NewsMediaAttributes, NewsMediaCreationAttributes>, NewsMediaAttributes {}

export const NewsMedia = sequelize.define<NewsMediaInstance, NewsMediaAttributes>('NewsMedia', {
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
    onDelete: 'cascade', // Se a notícia for deletada, suas mídias também
  },
  fileUrl: {
    type: DataTypes.TEXT, // Usamos TEXT para URLs
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'news_media', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT
  createdAt: 'created_at',
});

export default NewsMedia;
