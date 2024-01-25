const axios = require("axios");
const { API_KEY } = process.env;
const URL_API = "https://api.thedogapi.com/v1";

const getDetails = async (breedId) => {
  try {
    const { data } = await axios.get(
      `${URL_API}/breeds/${breedId}?api_key=${API_KEY}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getDetails,
};
