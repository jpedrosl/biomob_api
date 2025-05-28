import * as yup from "yup"

const userSchema = yup.object({
  name: yup.string().max(80).required(),
  email: yup.string().email().max(80).required(),
  password: yup.string().min(8).max(20).required(),
  photoUrl: yup.string().max(255).required(),
  verified: yup.boolean().default(false),
})

export default userSchema;