import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface GardenPlotAttributes {
  id: string;
  gardenId: string; // Foreign Key to CommunityGarden
  plotNumber?: string;
  size?: number;
  assignedTo?: string; // Foreign Key to User
  currentCrops?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GardenPlotCreationAttributes extends Optional<GardenPlotAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface GardenPlotInstance extends Model<GardenPlotAttributes, GardenPlotCreationAttributes>, GardenPlotAttributes {}

export const GardenPlot = sequelize.define<GardenPlotInstance, GardenPlotAttributes>('GardenPlot', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  gardenId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'community_gardens', // Nome da tabela referenciada
      key: 'id',
    },
    onDelete: 'cascade', // Se a horta for deletada, seus lotes também serão
  },
  plotNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  size: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: true,
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users', // Nome da tabela referenciada
      key: 'id',
    },
  },
  currentCrops: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  notes: {
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
  tableName: 'garden_plots', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default GardenPlot;
