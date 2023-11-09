const axios = require("axios");
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1";
const URL_IMG = "https://cdn2.thedogapi.com";

const getAllByApi = async () => {
  try {
    const url = `${URL_API}/breeds`;

    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    const dogs = data.map((breed) => {
      const idImg = breed.reference_image_id;
      return {
        id: breed.id,
        name: breed.name,
        image: `${URL_IMG}/images/${idImg}.jpg`,
        altura: breed.height,
        peso: breed.weight,
        life_span: breed.life_span,
        temperaments: breed.temperament ? breed.temperament.split(", ") : [],
      };
    });

    return dogs;
  } catch (error) {
    return error;
  }
};

const { Dog, Temperament } = require("../db");
const getAllByDb = async () => {
  try {
    const dbDogs = await Dog.findAll({
      include: Temperament,
    });
    return dbDogs;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllByApi,
  getAllByDb,
};
