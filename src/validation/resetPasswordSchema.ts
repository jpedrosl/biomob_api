import * as yup from "yup";

export const requestResetCodeSchema = yup.object({
  email: yup.string().email("Formato de email inválido.").required("O email é obrigatório para solicitar o código."),
});

export const resetPasswordSchema = yup.object({
  email: yup.string().email("Formato de email inválido.").required("O email é obrigatório."),
  code: yup.string().length(6, "O código deve ter 6 caracteres.").required("O código de redefinição é obrigatório."),
  newPassword: yup.string().min(8, "A nova senha deve ter no mínimo 8 caracteres.").max(20, "A nova senha deve ter no máximo 20 caracteres.").required("A nova senha é obrigatória."),
});
