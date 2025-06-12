import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";
import bcrypt from 'bcrypt';

type CheckPasswordCallBack = (err?: Error | undefined, isSame?: boolean  ) => void

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role : 'gestor' | 'operador' | 'externo';
  birthDate: Date;
  photoUrl: string;
  verified : boolean;
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}


export interface UserInstance extends Model<User, UserCreationAttributes>, User {
  checkPassword: (password: string, callbackfn: CheckPasswordCallBack) => void
}

export const User = sequelize.define<UserInstance, User>('User',{

  id: {
    allowNull: false,
    primaryKey:  true,
    autoIncrement: true,
    type: DataTypes.UUID,
  
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.ENUM('gestor', 'operador' , 'externo'),
    defaultValue: 'operador',
  },
  birthDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  photoUrl: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  verified: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},
  {
    hooks: {
      beforeSave: async user => {
        if (user.isNewRecord || user.changed('password')) {
          user.password = await bcrypt.hash(user.password.toString(),10); 
        }
      }
    }
  }
);

(User as any).prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallBack
) {
  bcrypt.compare(password , this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};