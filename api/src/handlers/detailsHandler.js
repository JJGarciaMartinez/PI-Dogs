const { getDetails } = require("../controllers/getDetailsCtrl");

const detailsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const dogDetail = await getDetails(id);
    return res.status(200).json(dogDetail);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { detailsHandler };
