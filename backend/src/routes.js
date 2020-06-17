const express = require("express");

const OngController = require("./controllers/OngController");
const IncedentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const { json } = require("express");

const routes = express.Router();

routes.post("/sessions", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncedentController.index);
routes.post("/incidents", IncedentController.create);
routes.delete("/incidents/:id", IncedentController.delete);

routes.get("/profile", ProfileController.index);

module.exports = routes;
