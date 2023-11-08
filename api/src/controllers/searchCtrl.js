const axios = require("axios");
const URL_API = "https://api.thedogapi.com/v1";

const searchByName = async (name) => {
  try {
    const { data } = await axios.get(`${URL_API}/breeds/search?q=${name}`);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = searchByName;
