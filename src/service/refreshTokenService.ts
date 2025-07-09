import { RefreshToken, RefreshTokenCreationAttributes } from "../models/RefreshToken";

export const refreshTokenService = {
  save: async (refreshTokenData: RefreshTokenCreationAttributes) => {
    const newRefreshToken = await RefreshToken.create(refreshTokenData);
    return newRefreshToken;
  },

  findByToken: async (token: string) => {
    const foundToken = await RefreshToken.findOne({
      where: { token },
    });
    return foundToken;
  },

  deleteByToken: async (token: string) => {
    await RefreshToken.destroy({
      where: { token },
    });
  },

  deleteByUserId: async (userId: string) => {
    await RefreshToken.destroy({
      where: { userId },
    });
  },
};
