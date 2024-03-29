const axios = require("axios");
const { Temperament } = require("../db.js");
const URL_API = "https://api.thedogapi.com/v1";

const getTempCtrl = async () => {
  try {
    const { data } = await axios(`${URL_API}/breeds`);
    let temperaments = [];
    data.forEach((breed) => {
      if (breed.temperament) {
        const temperamentos = breed.temperament.split(", ");
        temperamentos.forEach((temperamento) => {
          if (!temperaments.includes(temperamento)) {
            temperaments.push(temperamento);
          }
        });
      }
    });

    const tempsBd = await Promise.all(
      temperaments.map(async (temperament) => {
        const [temp, created] = await Temperament.findOrCreate({
          where: { name: temperament },
          defaults: { name: temperament },
        });
        return temp;
      })
    );
    return tempsBd;
  } catch (error) {
    return error;
  }
};

module.exports = getTempCtrl;
