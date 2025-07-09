import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface EventAttributes {
  id: string;
  title: string;
  description?: string;
  eventType?: string;
  startDate: Date;
  endDate: Date;
  location?: string; // Text description of location
  coordinates?: object; // GEOMETRY(POINT)
  reforestationAreaId?: string; // Foreign Key to ReflorestationAreas
  gardenId?: string; // Foreign Key to CommunityGardens
  createdBy: string; // Foreign Key to User
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventCreationAttributes extends Optional<EventAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface EventInstance extends Model<EventAttributes, EventCreationAttributes>, EventAttributes {}

export const Event = sequelize.define<EventInstance, EventAttributes>('Event', {
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
  eventType: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT, // Para localização textual
    allowNull: true,
  },
  coordinates: {
    type: DataTypes.GEOMETRY('POINT'), // Para localização geográfica
    allowNull: true,
  },
  reforestationAreaId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'reforestation_areas', // Nome da tabela de áreas de reflorestamento
      key: 'id',
    },
    onDelete: 'SET NULL', // Se a área de reflorestamento for deletada, a FK se torna NULL
  },
  gardenId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'community_gardens', // Nome da tabela de hortas comunitárias
      key: 'id',
    },
    onDelete: 'SET NULL', // Se a horta for deletada, a FK se torna NULL
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'USERS', 
      key: 'id',
    },
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
  tableName: 'events', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default Event;
