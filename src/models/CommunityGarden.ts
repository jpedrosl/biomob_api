import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface CommunityGardenAttributes {
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
  location?: object; // GEOMETRY(POINT)
  polygon?: object; // GEOMETRY(POLYGON)
  areaSize?: number;
  establishedDate?: Date;
  status?: string;
  contactPerson?: string; // UUID of the user
  photoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CommunityGardenCreationAttributes extends Optional<CommunityGardenAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CommunityGardenInstance extends Model<CommunityGardenAttributes, CommunityGardenCreationAttributes>, CommunityGardenAttributes {}

export const CommunityGarden = sequelize.define<CommunityGardenInstance, CommunityGardenAttributes>('CommunityGarden', {
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
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true,
  },
  polygon: {
    type: DataTypes.GEOMETRY('POLYGON'),
    allowNull: true,
  },
  areaSize: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  establishedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  contactPerson: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users', // Certifique-se que 'users' está em minúsculas também
      key: 'id',
    },
  },
  photoUrl: {
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
  tableName: 'community_gardens',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default CommunityGarden;