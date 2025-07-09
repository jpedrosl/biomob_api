import * as yup from "yup";

const eventParticipantSchema = yup.object({
  eventId: yup.string().uuid("ID do evento inválido.").required("O ID do evento é obrigatório."),
  // userId não é validado aqui, pois será obtido do token de autenticação no POST
  status: yup.string().max(50, "O status deve ter no máximo 50 caracteres.").optional(), // Pode ter valores como 'registered', 'attended', 'cancelled'
});

export default eventParticipantSchema;
