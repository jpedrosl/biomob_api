import Seedling from "../models/Seedling";
import type { SeedlingCreationAttributes } from "../models/Seedling";

export const seedlingService = {
  save: async (seedling: SeedlingCreationAttributes) => {
    console.log('Chegou no service AQUI');
    console.log(seedling);

    const newSeedling = await Seedling.create({
      ...seedling,
      coordinates: (seedling as any).coordinates ? { type: 'Point', coordinates: (seedling as any).coordinates } : undefined, // Alterado de 'null' para 'undefined'
    });

    console.log('REQUISIÇÃO AQUI');
    console.log(newSeedling);

    return newSeedling;
  }
};