const { Router } = require("express");
//* Importar todos los routers;
const getDogsHandler = require("../handlers/getAllHandler");
const searchHandler = require("../handlers/searchHandler");
const detailsHandler = require("../handlers/detailsHandler");
const createDogHandler = require("../handlers/createHandler");
const getTempsHandler = require("../handlers/tempsHandler");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs", getDogsHandler);
router.get("/dog/name", searchHandler);
router.get("/dog/:id", detailsHandler);
router.post("/dog", createDogHandler);
router.get("/temperament", getTempsHandler);

module.exports = router;
