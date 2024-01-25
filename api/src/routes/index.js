const { Router } = require("express");
//* Importar todos los routers;
const { getDogsHandler } = require("../handlers/getAllHandler.js");
const { searchHandler } = require("../handlers/searchHandler.js");
const { detailsHandler } = require("../handlers/detailsHandler.js");
const { createDogHandler } = require("../handlers/createHandler.js");
const { getTempsHandler } = require("../handlers/tempsHandler.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogsHandler);
router.get("/dogs/name", searchHandler);
router.get("/dogs/:id", detailsHandler);
router.post("/dogs", createDogHandler);
router.get("/temperaments", getTempsHandler);

module.exports = router;
