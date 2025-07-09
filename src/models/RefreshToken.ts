import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface RefreshTokenAttributes {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface RefreshTokenInstance extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>, RefreshTokenAttributes {}

export const RefreshToken = sequelize.define<RefreshTokenInstance, RefreshTokenAttributes>('RefreshToken', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela de usuários em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se o usuário for deletado, o token também será removido
  },
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
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
  tableName: 'refresh_tokens', // Nome da tabela em minúsculas
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default RefreshToken;
