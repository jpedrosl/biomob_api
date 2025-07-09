import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface ResetCodeAttributes {
  id: string;
  userId: string;
  code: string;
  expiresAt: Date;
  used?: boolean;
  createdAt?: Date;
}

export interface ResetCodeCreationAttributes extends Optional<ResetCodeAttributes, 'id' | 'used' | 'createdAt'> {}

export interface ResetCodeInstance extends Model<ResetCodeAttributes, ResetCodeCreationAttributes>, ResetCodeAttributes {}

export const ResetCode = sequelize.define<ResetCodeInstance, ResetCodeAttributes>('ResetCode', {
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
    onDelete: 'cascade', // Se o usuário for deletado, o código de redefinição também será removido
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'reset_codes', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT, então defini como false
  createdAt: 'created_at',
});

export default ResetCode;
