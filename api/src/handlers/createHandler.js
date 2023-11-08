const { createNewDog } = require("../controllers/createCtrl");

const createDogHandler = async (req, res) => {
  const dogData = req.body;
  try {
    await createNewDog(dogData);
    return res.status(200).json({ message: "Dog created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = createDogHandler;
