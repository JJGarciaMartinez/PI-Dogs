const { Dog, Temperament } = require("../db.js");

const createNewDog = async (req, res) => {
  try {
    const { name, image, altura, peso, life_span } = await dogData;
    if (!name || !image || !altura || !peso || !life_span) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const newDog = await Dog.create({
      image,
      name,
      altura,
      peso,
      life_span,
      inDb: true,
    });
    if (dogData.temperaments && dogData.temperaments.length > 0) {
      const temps = await Temperament.findAll({
        where: { name: dogData.temperaments },
      });
      await newDog.setTemperaments(temps);
    }
    return newDog;
  } catch (error) {
    throw error;
  }
};

module.exports = createNewDog;
