import * as yup from "yup";

const gardenPlotSchema = yup.object({
  gardenId: yup.string().uuid("ID da horta comunitária inválido.").required("O ID da horta comunitária é obrigatório."),
  plotNumber: yup.string().max(20, "O número do lote deve ter no máximo 20 caracteres.").optional(),
  size: yup.number().positive("O tamanho do lote deve ser um número positivo.").optional(),
  assignedTo: yup.string().uuid("ID do usuário atribuído inválido.").nullable().optional(), // Pode ser nulo se não atribuído
  currentCrops: yup.string().optional(),
  notes: yup.string().optional(),
});

export default gardenPlotSchema;
