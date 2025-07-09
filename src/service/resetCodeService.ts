import { ResetCode, ResetCodeCreationAttributes } from "../models/ResetCode";
import { UserInstance } from "../models/User";
import crypto from 'crypto';
import { DataTypes, Op } from 'sequelize';

export const resetCodeService = {
  generateAndSave: async (user: UserInstance) => {
    const code = crypto.randomBytes(3).toString('hex').toUpperCase(); 
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

    const resetCodeData: ResetCodeCreationAttributes = {
      userId: user.id,
      code,
      expiresAt,
    };

    const newResetCode = await ResetCode.create(resetCodeData);
    return newResetCode;
  },

  findByCodeAndEmail: async (code: string, email: string) => {
    const foundCode = await ResetCode.findOne({
      where: { code },
      include: [{
        association: 'User', 
        where: { email }
      }]
    });
    return foundCode;
  },

  markAsUsed: async (codeId: string) => {
    await ResetCode.update({ used: true }, {
      where: { id: codeId }
    });
  },

  deleteExpiredCodes: async () => {
    await ResetCode.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date()
        },
        used: false 
      }
    });
  }
};
