const { Dog, Temperament } = require("../db.js");
const { conn } = require("../db.js");

const createNewDog = async (dogData) => {
  try {
    const { name, image, altura, peso, lifespan } = await dogData;
    if (!name || !image || !altura || !peso || !lifespan) {
      throw new Error("Faltan datos obligatorios");
    }
    const newDog = await Dog.create({
      image,
      name,
      altura,
      peso,
      lifespan,
      inDb: true,
    });
    if (dogData.temperaments && dogData.temperaments.length > 0) {
      const temperaments = await Temperament.findAll({
        where: { name: dogData.temperaments },
      });
      await newDog.setTemperaments(temperaments);
    }
    return newDog;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = createNewDog;
