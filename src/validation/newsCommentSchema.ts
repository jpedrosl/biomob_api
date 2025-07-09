import * as yup from "yup";

const newsCommentSchema = yup.object({
  newsId: yup.string().uuid("ID da notícia inválido.").required("O ID da notícia é obrigatório."),
  // userId não é validado aqui, pois será obtido do token do usuário autenticado
  parentCommentId: yup.string().uuid("ID do comentário pai inválido.").nullable().optional(), // Pode ser nulo para comentários de nível superior
  content: yup.string().required("O conteúdo do comentário é obrigatório.").min(1, "O comentário não pode ser vazio.").max(1000, "O comentário deve ter no máximo 1000 caracteres."), // Limite de 1000 caracteres
  // approved não é definido pelo usuário na criação
});

export default newsCommentSchema;
