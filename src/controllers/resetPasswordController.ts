import { Request, Response } from "express";
import { userService } from "../service/userService";
import { resetCodeService } from "../service/resetCodeService";
import bcrypt from 'bcrypt';

export const resetPasswordController = {
  requestResetCode: async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado com este email." });
      }

    
      await resetCodeService.deleteExpiredCodes();

      const resetCode = await resetCodeService.generateAndSave(user);

      console.log(`Código de redefinição gerado para ${email}: ${resetCode.code}`);

      return res.status(200).json({ message: "Código de redefinição gerado e enviado (verifique o console para simulação).", code: resetCode.code });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao solicitar código de redefinição.");
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    const { email, code, newPassword } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const foundResetCode = await resetCodeService.findByCodeAndEmail(code, email);

      if (!foundResetCode || foundResetCode.userId !== user.id) {
        return res.status(400).json({ message: "Código de redefinição inválido ou não corresponde ao usuário." });
      }

      if (foundResetCode.used) {
        return res.status(400).json({ message: "Código de redefinição já utilizado." });
      }

      if (foundResetCode.expiresAt < new Date()) {
        await resetCodeService.markAsUsed(foundResetCode.id); 
        return res.status(400).json({ message: "Código de redefinição expirado." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      

      await user.update({ password: hashedPassword });


      await resetCodeService.markAsUsed(foundResetCode.id);

      return res.status(200).json({ message: "Senha redefinida com sucesso!" });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json(error.message);
      }
      return res.status(500).json("Erro interno do servidor ao redefinir senha.");
    }
  },
};
