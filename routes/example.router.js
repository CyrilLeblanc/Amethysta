const express = require("express");
const exampleController = require("../controllers/example.controller");

const exampleRouter = express.Router();
exampleRouter.get("/json", exampleController.getExample);
exampleRouter.get("/page", exampleController.getExamplePage);
exampleRouter.get("/session", exampleController.getSession);
module.exports = exampleRouter;
