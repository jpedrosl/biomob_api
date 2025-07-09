import * as yup from "yup";

const refreshTokenSchema = yup.object({
  refreshToken: yup.string().required("O token de atualização é obrigatório."),
});

export default refreshTokenSchema;