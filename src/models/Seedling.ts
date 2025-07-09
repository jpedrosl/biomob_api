import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface SeedlingAttributes {
  id: string;
  reforestationAreaId: string;
  speciesName?: string;
  scientificName?: string;
  plantingDate?: Date;
  coordinates?: object;
  currentHeight?: number;
  currentStatus?: string;
  lastWateringDate?: Date;
  lastMaintenanceDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SeedlingCreationAttributes extends Optional<SeedlingAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface SeedlingInstance extends Model<SeedlingAttributes, SeedlingCreationAttributes>, SeedlingAttributes {}

const Seedling = sequelize.define<SeedlingInstance, SeedlingAttributes>('Seedling', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  reforestationAreaId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'reforestation_areas', // Nome da tabela de áreas de reflorestamento em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se a área de reflorestamento for deletada, as mudas também serão
  },
  speciesName: {
    type: DataTypes.STRING(255),
  },
  scientificName: {
    type: DataTypes.STRING(255),
  },
  plantingDate: {
    type: DataTypes.DATEONLY,
  },
  coordinates: {
    type: DataTypes.GEOMETRY('point'), // Para coordenadas geográficas
  },
  currentHeight: {
    type: DataTypes.DECIMAL(6, 2),
  },
  currentStatus: {
    type: DataTypes.STRING(50),
  },
  lastWateringDate: {
    type: DataTypes.DATEONLY,
  },
  lastMaintenanceDate: {
    type: DataTypes.DATEONLY,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'seedlings', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Seedling;