import * as yup from "yup";

const newsSchema = yup.object({
  title: yup.string().max(255, "O título deve ter no máximo 255 caracteres.").required("O título da notícia é obrigatório."),
  slug: yup.string().max(255, "O slug deve ter no máximo 255 caracteres.").required("O slug é obrigatório e deve ser único."),
  content: yup.string().required("O conteúdo da notícia é obrigatório."),
  summary: yup.string().optional(),
  coverImageUrl: yup.string().url("URL da imagem de capa inválida.").optional(),
  // authorId não é validado aqui, pois será obtido do token do usuário autenticado (gestor)
  published: yup.boolean().optional(),
  publishedAt: yup.date().nullable().optional(), // Pode ser nulo se não publicado
  // viewCount e featured não são definidos pelo usuário na criação/atualização
});

export default newsSchema;
