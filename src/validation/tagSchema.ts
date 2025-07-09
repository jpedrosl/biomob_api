import * as yup from "yup";

const tagSchema = yup.object({
  name: yup.string().max(50, "O nome deve ter no máximo 50 caracteres.").required("O nome da tag é obrigatório."),
  slug: yup.string().max(50, "O slug deve ter no máximo 50 caracteres.").required("O slug é obrigatório e deve ser único."),
});

export default tagSchema;
