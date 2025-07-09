import * as yup from "yup";

const eventSchema = yup.object({
  title: yup.string().max(255, "O título deve ter no máximo 255 caracteres.").required("O título do evento é obrigatório."),
  description: yup.string().optional(),
  eventType: yup.string().max(50, "O tipo do evento deve ter no máximo 50 caracteres.").optional(),
  startDate: yup.date().required("A data de início é obrigatória."),
  endDate: yup.date()
    .required("A data de término é obrigatória.")
    .min(yup.ref('startDate'), "A data de término não pode ser anterior à data de início."), // Garante que a data de término não é antes da de início
  location: yup.string().optional(),
  
  // Para COORDINATES (Point)
  coordinates: yup.array().of(yup.number()).nullable().optional(), // Assumindo [longitude, latitude]
  
  reforestationAreaId: yup.string().uuid("ID da área de reflorestamento inválido.").nullable().optional(),
  gardenId: yup.string().uuid("ID da horta comunitária inválido.").nullable().optional(),
  
  // createdBy não é validado aqui, pois será obtido do token de autenticação
});

export default eventSchema;
