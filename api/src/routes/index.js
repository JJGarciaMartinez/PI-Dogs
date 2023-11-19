const { Router } = require("express");
//* Importar todos los routers;
const { getDogsHandler } = require("../handlers/getAllHandler");
const { searchHandler } = require("../handlers/searchHandler");
const { detailsHandler } = require("../handlers/detailsHandler");
const { createDogHandler } = require("../handlers/createHandler");
const { getTempsHandler } = require("../handlers/tempsHandler");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogsHandler);
router.get("/dogs/name", searchHandler);
router.get("/dogs/:id", detailsHandler);
router.post("/dogs", createDogHandler);
router.get("/temperaments", getTempsHandler);

module.exports = router;
