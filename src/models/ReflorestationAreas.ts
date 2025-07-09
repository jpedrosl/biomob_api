import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface ReflorestationAreasAttributes {
  id: string;
  name: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  // MUDANÇA AQUI: Definir polygon como o tipo GeoJSON Polygon esperado
  polygon?: {
    type: 'Polygon';
    coordinates: number[][][]; // Ex: [[[lon, lat], [lon, lat], ...]]
  };
  areaSize?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// MUDANÇA AQUI: Refletir o tipo correto para polygon na criação também
export interface ReflorestationAreasCreationAttributes extends Optional<ReflorestationAreasAttributes, 'id' | 'description' | 'address' | 'city' | 'state' | 'country' | 'postalCode' | 'latitude' | 'longitude' | 'polygon' | 'areaSize' | 'status' | 'createdAt' | 'updatedAt'> {}

export interface ReflorestationAreasInstance extends Model<ReflorestationAreasAttributes , ReflorestationAreasCreationAttributes>, ReflorestationAreasAttributes {}

export const ReflorestationAreas = sequelize.define<ReflorestationAreasInstance, ReflorestationAreasAttributes>('ReflorestationAreas',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  postalCode: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
  polygon: {
    type: DataTypes.GEOMETRY('POLYGON'),
    allowNull: true,
  },
  areaSize: {
    field: 'area_size',
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'reflorestation_areas',
  timestamps: true,
});

export default ReflorestationAreas;
