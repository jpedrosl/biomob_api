import { Request, Response } from "express";
import { jwtService } from "../service/jwtService";
import { userService } from "../service/userService";
import { refreshTokenService } from "../service/refreshTokenService";
import { JwtPayload } from "jsonwebtoken";

export const refreshTokenController = {
  refresh: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    try {
      if (!refreshToken) {
        return res.status(400).json({ message: "Token de atualização ausente." });
      }

      const foundRefreshToken = await refreshTokenService.findByToken(refreshToken);

      if (!foundRefreshToken) {
        return res.status(401).json({ message: "Token de atualização inválido ou expirado." });
      }

      if (foundRefreshToken.expiresAt < new Date()) {
        await refreshTokenService.deleteByToken(refreshToken);
        return res.status(401).json({ message: "Token de atualização expirado. Faça login novamente." });
      }

      let decodedPayload: JwtPayload;
      try {
        decodedPayload = (await new Promise<JwtPayload>((resolve, reject) => { // Especifica o tipo da Promise como JwtPayload
          jwtService.verifyToken(foundRefreshToken.token, (err, decoded) => {
            if (err) {
              return reject(err);
            }
            // Garante que 'decoded' é um objeto e o converte para JwtPayload
            if (typeof decoded === 'object' && decoded !== null) {
              resolve(decoded as JwtPayload);
            } else {
              reject(new Error("Payload do token inválido ou não é um objeto."));
            }
          });
        })) as JwtPayload;

      } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
          await refreshTokenService.deleteByToken(refreshToken);
          return res.status(401).json({ message: "Token de atualização expirado durante a verificação. Faça login novamente." });
        }
        return res.status(401).json({ message: "Token de atualização inválido." });
      }

      if (!decodedPayload.email || typeof decodedPayload.email !== 'string') {
        return res.status(401).json({ message: "Payload do token inválido: email ausente ou em formato incorreto." });
      }

      const user = await userService.findByEmail(decodedPayload.email);

      if (!user) {
        await refreshTokenService.deleteByToken(refreshToken);
        return res.status(401).json({ message: "Usuário não encontrado." });
      }

      const newAccessTokenPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        birthDate: user.birthDate,
        photoUrl: user.photoUrl,
        verified: user.verified,
      };

      const jwtExpiresString = process.env.JWT_EXPIRES || '1d';
      const newAccessToken = jwtService.generateToken(newAccessTokenPayload, jwtExpiresString);

      await refreshTokenService.deleteByToken(refreshToken);
      
      const newRefreshTokenValue = jwtService.generateToken({ userId: String(user.id) }, '7d');
      const newRefreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await refreshTokenService.save({
        userId: String(user.id),
        token: newRefreshTokenValue,
        expiresAt: newRefreshTokenExpiresAt,
      });

      return res.status(200).json({
        authenticated: true,
        ...newAccessTokenPayload,
        token: newAccessToken,
        refreshToken: newRefreshTokenValue,
      });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor.");
    }
  },
};
