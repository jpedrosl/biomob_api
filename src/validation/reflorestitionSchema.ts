import * as yup from "yup"

const reflorestationSchema = yup.object({
  name: yup.string().max(255).required(),
  description: yup.string().max(255).required(),
  address: yup.string().max(255).required(),
  city: yup.string().max(100).required(),
  state: yup.string().max(100).required(),
  country: yup.string().max(100).required(),
  postalCode: yup.string().max(20).required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  areasize: yup.number().required(),
  status: yup.string().max(50).required(),
})

export default reflorestationSchema;