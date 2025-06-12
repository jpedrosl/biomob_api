import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface ReflorestationAreas {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  areasize: number;
  status: string;
}

export interface ReflorestationAreasCreationAttributes extends Optional<ReflorestationAreas, 'id'> {}

export interface ReflorestationAreasInstance extends Model<ReflorestationAreas , ReflorestationAreasCreationAttributes> ,
ReflorestationAreas {}

export const ReflorestationAreas = sequelize.define<ReflorestationAreasInstance, ReflorestationAreas>('ReflorestationAreas',{

  id: {
    allowNull: false,
    primaryKey:  true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4, 
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
    }, 
    address: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    city: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    state: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    country: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    postalCode: {
        allowNull: true,
        type: DataTypes.STRING,
    },
    latitude: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    longitude: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    areasize: {
        allowNull: true,
        type: DataTypes.FLOAT,
    },
    status: {
        allowNull: true,
        type: DataTypes.STRING,
    }
    });