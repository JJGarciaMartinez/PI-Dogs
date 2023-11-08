const { getAllByApi, getAllByBdd } = require("../controllers/getAllCtrl");

const getDogsHandler = async (req, res) => {
  try {
    const fromApi = await getAllByApi();
    const fromDb = await getAllByBdd();
    if (!fromApi || !fromDb) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    const fromApiAndDb = await [...fromApi, ...fromDb];
    return res.status(200).json(fromApiAndDb);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getDogsHandler;
