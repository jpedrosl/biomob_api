import * as yup from "yup";

const newsToCategorySchema = yup.object({
  newsId: yup.string().uuid("ID da notícia inválido.").required("O ID da notícia é obrigatório."),
  categoryId: yup.string().uuid("ID da categoria inválido.").required("O ID da categoria é obrigatório."),
});

export default newsToCategorySchema;
