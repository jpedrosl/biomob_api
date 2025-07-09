import * as yup from "yup";

const communityGardenSchema = yup.object({
  name: yup.string().max(255, "O nome deve ter no máximo 255 caracteres.").required("O nome da horta comunitária é obrigatório."),
  description: yup.string().optional(),
  address: yup.string().optional(),
  city: yup.string().max(100, "A cidade deve ter no máximo 100 caracteres.").optional(),
  state: yup.string().max(100, "O estado deve ter no máximo 100 caracteres.").optional(),
  country: yup.string().max(100, "O país deve ter no máximo 100 caracteres.").optional(),
  postalCode: yup.string().max(20, "O CEP deve ter no máximo 20 caracteres.").optional(),
  latitude: yup.number().min(-90, "Latitude inválida (-90 a 90).").max(90, "Latitude inválida (-90 a 90).").optional(),
  longitude: yup.number().min(-180, "Longitude inválida (-180 a 180).").max(180, "Longitude inválida (-180 a 180).").optional(),
  
  // Para LOCATION (Point) e POLYGON (Polygon), você pode adicionar validação se eles vêm como strings JSON ou arrays
  // Por agora, assumimos que o controlador fará a conversão para o formato GEOMETRY esperado pelo Sequelize
  location: yup.array().of(yup.number()).nullable().optional(), // Assumindo [longitude, latitude]
  polygon: yup.array().of(yup.array().of(yup.array().of(yup.number()))).nullable().optional(), // Assumindo [[[x,y],[x,y],...]]
  
  areaSize: yup.number().positive("O tamanho da área deve ser positivo.").optional(),
  establishedDate: yup.date().optional(),
  status: yup.string().max(50, "O status deve ter no máximo 50 caracteres.").optional(),
  contactPerson: yup.string().uuid("ID da pessoa de contato inválido.").optional(), // UUID do usuário
  photoUrl: yup.string().url("URL da foto inválida.").optional(),
});

export default communityGardenSchema;
