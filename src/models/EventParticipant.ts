import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface EventParticipantAttributes {
  id: string;
  eventId: string; // Foreign Key to Events
  userId: string; // Foreign Key to Users
  status?: string; // e.g., 'registered', 'attended', 'cancelled'
  createdAt?: Date;
}

export interface EventParticipantCreationAttributes extends Optional<EventParticipantAttributes, 'id' | 'createdAt'> {}

export interface EventParticipantInstance extends Model<EventParticipantAttributes, EventParticipantCreationAttributes>, EventParticipantAttributes {}

export const EventParticipant = sequelize.define<EventParticipantInstance, EventParticipantAttributes>('EventParticipant', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'events', // Nome da tabela de eventos
      key: 'id',
    },
    onDelete: 'cascade', // Se o evento for deletado, a participação também
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela de usuários
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'registered',
    allowNull: true, // Ou false, dependendo se o status inicial é sempre 'registered'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'event_participants', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT
  createdAt: 'created_at',
});

export default EventParticipant;
