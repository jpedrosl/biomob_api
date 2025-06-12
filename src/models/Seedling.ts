import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

interface SeedlingAttributes {
  ID: string;
  REFLORESTATION_AREA_ID: string;
  SPECIES_NAME?: string;
  SCIENTIFIC_NAME?: string;
  PLANTING_DATE?: Date;
  COORDINATES?: object;
  CURRENT_HEIGHT?: number;
  CURRENT_STATUS?: string;
  LAST_WATERING_DATE?: Date;
  LAST_MAINTENANCE_DATE?: Date;
  NOTES?: string;
  CREATED_AT?: Date;
  UPDATED_AT?: Date;
}

interface SeedlingCreationAttributes extends Optional<SeedlingAttributes, 'ID' | 'CREATED_AT' | 'UPDATED_AT'> {}

interface SeedlingInstance extends Model<SeedlingAttributes, SeedlingCreationAttributes>, SeedlingAttributes {
  CREATED_AT?: Date;
  UPDATED_AT?: Date;
}

const Seedling = sequelize.define<SeedlingInstance>('Seedling', {
  ID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  REFLORESTATION_AREA_ID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'REFLORESTATION_AREAS',
      key: 'ID',
    },
    onDelete: 'CASCADE',
  },
  SPECIES_NAME: {
    type: DataTypes.STRING(255),
  },
  SCIENTIFIC_NAME: {
    type: DataTypes.STRING(255),
  },
  PLANTING_DATE: {
    type: DataTypes.DATEONLY,
  },
  COORDINATES: {
    type: DataTypes.GEOMETRY('POINT'),
  },
  CURRENT_HEIGHT: {
    type: DataTypes.DECIMAL(6, 2),
  },
  CURRENT_STATUS: {
    type: DataTypes.STRING(50),
  },
  LAST_WATERING_DATE: {
    type: DataTypes.DATEONLY,
  },
  LAST_MAINTENANCE_DATE: {
    type: DataTypes.DATEONLY,
  },
  NOTES: {
    type: DataTypes.TEXT,
  },
  CREATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  UPDATED_AT: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'SEEDLINGS',
  timestamps: true,
  createdAt: 'CREATED_AT',
  updatedAt: 'UPDATED_AT',
  // underscored: true,
});

export default Seedling;