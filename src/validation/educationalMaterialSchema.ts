import * as yup from "yup";

const educationalMaterialSchema = yup.object({
  title: yup.string().max(255, "O título deve ter no máximo 255 caracteres.").required("O título do material é obrigatório."),
  description: yup.string().optional(),
  materialType: yup.string().max(50, "O tipo de material deve ter no máximo 50 caracteres.").optional(),
  fileUrl: yup.string().url("A URL do arquivo é inválida.").required("A URL do arquivo é obrigatória."),
  category: yup.string().max(100, "A categoria deve ter no máximo 100 caracteres.").optional(),
  // uploadedBy não é validado aqui, pois será obtido do token do usuário autenticado (gestor)
});

export default educationalMaterialSchema;
