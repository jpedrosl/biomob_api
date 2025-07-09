import * as yup from "yup";

const newsToTagSchema = yup.object({
  newsId: yup.string().uuid("ID da notícia inválido.").required("O ID da notícia é obrigatório."),
  tagId: yup.string().uuid("ID da tag inválido.").required("O ID da tag é obrigatório."),
});

export default newsToTagSchema;
