import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface EducationalMaterialAttributes {
  id: string;
  title: string;
  description?: string;
  materialType?: string; // e.g., 'PDF', 'Video', 'Article'
  fileUrl: string; // URL para o arquivo armazenado (ex: S3, Google Cloud Storage)
  category?: string;
  uploadedBy: string; // Foreign Key to Users (gestor)
  downloadCount?: number; // Contador de downloads
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EducationalMaterialCreationAttributes extends Optional<EducationalMaterialAttributes, 'id' | 'downloadCount' | 'createdAt' | 'updatedAt'> {}

export interface EducationalMaterialInstance extends Model<EducationalMaterialAttributes, EducationalMaterialCreationAttributes>, EducationalMaterialAttributes {}

export const EducationalMaterial = sequelize.define<EducationalMaterialInstance, EducationalMaterialAttributes>('EducationalMaterial', {
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
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  materialType: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fileUrl: {
    type: DataTypes.TEXT, // Usamos TEXT para URLs que podem ser longas
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  uploadedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela de usuários
      key: 'id',
    },
  },
  downloadCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
  tableName: 'educational_materials',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default EducationalMaterial;
