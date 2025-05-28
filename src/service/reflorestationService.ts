import { ReflorestationAreas, ReflorestationAreasCreationAttributes } from "../models/ReflorestationAreas" 

export const reflorestationService = {
 
 save: async (reflorestation: ReflorestationAreasCreationAttributes) => {
  console.log('Chegou no service AQUI')
  console.log(reflorestation)
  
  const newReflorestationAreas = await ReflorestationAreas.create(reflorestation)

  console.log('REQUISIÇÃO AQUI')
  console.log(newReflorestationAreas)

  return newReflorestationAreas
 }
}