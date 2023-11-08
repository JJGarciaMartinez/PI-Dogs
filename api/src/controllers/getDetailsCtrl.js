const axios = require("axios");
const URL_API = "https://api.thedogapi.com/v1";

const getDetails = async (breedId) => {
  try {
    const { data } = await axios.get(`${URL_API}/breeds/${breedId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDetails,
};
