const axios = require("axios");
const { Temperament } = require("../db");
const URL_API = "https://api.thedogapi.com/v1";

const getTempCtrl = async () => {
  try {
    const { data } = await axios.get(`${URL_API}/breeds`);

    let temperaments = [];

    data.foreach((breed) => {
      if (breed.temperaments) {
        const temp = breed.temperament.split(",");
        temp.foreach((t) => {
          if (!temperaments.includes(t)) {
            temperaments.push(t);
          }
        });
      }
    });

    const newTemp = await Promise.all(
      temperaments.map(async (temperament) => {
        const [temp, created] = await Temperament.findOrCreate({
          where: { name: temperament },
          defaults: { name: temperament },
        });
        return temp;
      })
    );
    return newTemp;
  } catch (error) {
    return error;
  }
};

module.exports = getTempCtrl;
