import * as yup from "yup";

const newsCategorySchema = yup.object({
  name: yup.string().max(100, "O nome deve ter no máximo 100 caracteres.").required("O nome da categoria é obrigatório."),
  slug: yup.string().max(100, "O slug deve ter no máximo 100 caracteres.").required("O slug é obrigatório e deve ser único."),
  description: yup.string().optional(),
});

export default newsCategorySchema;
