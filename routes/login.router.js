const express = require("express");
const loginController = require("../controllers/login.controller");

const loginRouter = express.Router();
loginRouter.get("/", loginController.get);
loginRouter.post("/", loginController.post);

module.exports = loginRouter;
