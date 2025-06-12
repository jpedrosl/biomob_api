import * as yup from "yup"

const seedlingSchema = yup.object({
  reforestationAreaId: yup.string().uuid("ID da área de reflorestamento inválido.").required("ID da área de reflorestamento é obrigatório."),
  speciesName: yup.string().max(255).optional(),
  scientificName: yup.string().max(255).optional(),
  plantingDate: yup.date().optional(),
  latitude: yup.number().min(-90).max(90).optional(),
  longitude: yup.number().min(-180).max(180).optional(),
  currentHeight: yup.number().positive("Altura deve ser um número positivo.").optional(),
  currentStatus: yup.string().max(50).optional(),
  lastWateringDate: yup.date().optional(),
  lastMaintenanceDate: yup.date().optional(),
  notes: yup.string().optional(),
})

export default seedlingSchema;