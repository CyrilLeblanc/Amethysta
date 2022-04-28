const express = require("express");
const exampleController = require("../controllers/example.controller");

const exampleRouter = express.Router();
exampleRouter.get("/example", exampleController.getExample);

module.exports = exampleRouter;
