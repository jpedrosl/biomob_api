import * as yup from "yup";

const reflorestationSchema = yup.object({
  name: yup.string().max(255, "O nome deve ter no máximo 255 caracteres.").required("O nome da área de reflorestamento é obrigatório."),
  description: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().max(100, "A cidade deve ter no máximo 100 caracteres.").optional(),
  state: yup.string().max(100, "O estado deve ter no máximo 100 caracteres.").optional(),
  country: yup.string().max(100, "O país deve ter no máximo 100 caracteres.").optional(),
  postalCode: yup.string().max(20, "O CEP deve ter no máximo 20 caracteres.").optional(),
  latitude: yup.number().min(-90, "Latitude inválida (-90 a 90).").max(90, "Latitude inválida (-90 a 90).").optional().nullable(),
  longitude: yup.number().min(-180, "Longitude inválida (-180 a 180).").max(180, "Longitude inválida (-180 a 180).").optional().nullable(),
  polygon: yup.array().of(
    yup.array().of(
      yup.array().of(
        yup.number().required()
      ).min(2).required() // Um anel (linear ring) deve ter pelo menos 2 pontos (mas para um polígono, precisa de 3+1)
    ).min(1).required() // Pelo menos um anel (anel exterior)
  ).optional().nullable(), // Opcional e pode ser nulo
  areaSize: yup.number().positive("O tamanho da área deve ser positivo.").optional().nullable(),
  status: yup.string().max(50, "O status deve ter no máximo 50 caracteres.").optional(),
});

export default reflorestationSchema;
