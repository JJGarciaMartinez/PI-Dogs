const { getTempCtrl } = require("../controllers/getTempCtrl");

const getTempsHandler = async (req, res) => {
  try {
    const temperaments = await getTempCtrl();
    return res.status(200).json(temperaments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getTempsHandler;
