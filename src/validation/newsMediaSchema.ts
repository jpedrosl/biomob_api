import * as yup from "yup";

const newsMediaSchema = yup.object({
  newsId: yup.string().uuid("ID da notícia inválido.").required("O ID da notícia é obrigatório."),
  fileUrl: yup.string().url("A URL do arquivo é inválida.").required("A URL do arquivo é obrigatória."),
  fileType: yup.string().max(20, "O tipo de arquivo deve ter no máximo 20 caracteres.").optional(),
  caption: yup.string().optional(),
  displayOrder: yup.number().integer("A ordem de exibição deve ser um número inteiro.").positive("A ordem de exibição deve ser um número positivo.").optional(),
});

export default newsMediaSchema;
