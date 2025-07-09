import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface SeedlingGrowthRecordAttributes {
  id: string;
  seedlingId: string;
  recordDate: Date;
  height: number;
  healthStatus?: string;
  notes?: string;
  photoUrl?: string;
  recordedBy: string;
  createdAt?: Date;
}

export interface SeedlingGrowthRecordCreationAttributes extends Optional<SeedlingGrowthRecordAttributes, 'id' | 'createdAt'> {}

export interface SeedlingGrowthRecordInstance extends Model<SeedlingGrowthRecordAttributes, SeedlingGrowthRecordCreationAttributes>, SeedlingGrowthRecordAttributes {}

export const SeedlingGrowthRecord = sequelize.define<SeedlingGrowthRecordInstance, SeedlingGrowthRecordAttributes>('SeedlingGrowthRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  seedlingId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'seedlings', // Nome da tabela de mudas em minúsculas
      key: 'id',
    },
    onDelete: 'cascade', // Se a muda for deletada, o registro de crescimento também será removido
  },
  recordDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  height: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
  },
  healthStatus: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photoUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  recordedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Nome da tabela de usuários em minúsculas
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'seedling_growth_records', // Nome da tabela em minúsculas
  timestamps: false, // Esta tabela não tem UPDATED_AT, então defini como false
  createdAt: 'created_at',
});

export default SeedlingGrowthRecord;
