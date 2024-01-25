const searchByName = require("../controllers/searchCtrl.js");

const searchHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const dogsByName = await searchByName(name);
    return res.status(200).json(dogsByName);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { searchHandler };
