import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../database";
import bcrypt from 'bcrypt';

type CheckPasswordCallBack = (error?: Error | undefined, isSamePassword?: boolean  ) => void

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}


export interface UserInstance extends Model<User, UserCreationAttributes>, User {
  checkPassword: (password: string, callbackfunc: CheckPasswordCallBack) => void
}

export const User = sequelize.define<UserInstance, User>('User',{

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey:  true,
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

// User.prototype.checkPassword = function (
//   password: string,
//   callbackfunc: CheckPasswordCallBack
// ) {
//   bcrypt.compare(password , this.password, (error, isSame) => {
//     if (error) {
//       callbackfunc(error);
//     } else {
//       callbackfunc(error, isSame);
//     }
//   });
// };