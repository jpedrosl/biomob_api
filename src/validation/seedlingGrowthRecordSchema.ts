import * as yup from "yup";

const seedlingGrowthRecordSchema = yup.object({
  seedlingId: yup.string().uuid("ID da muda inválido.").required("O ID da muda é obrigatório."),
  recordDate: yup.date().required("A data do registro é obrigatória."),
  height: yup.number().positive("A altura deve ser um número positivo.").required("A altura é obrigatória."),
  healthStatus: yup.string().max(50, "O status de saúde deve ter no máximo 50 caracteres.").optional(),
  notes: yup.string().optional(),
  photoUrl: yup.string().url("URL da foto inválida.").optional(),
  recordedBy: yup.string().uuid("ID do registrador inválido.").required("O ID do usuário que registrou é obrigatório."),
});

export default seedlingGrowthRecordSchema;
