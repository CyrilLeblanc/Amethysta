const express = require("express");
const registerController = require("../controllers/register.controller");

const registerRouter = express.Router();
registerRouter.get("/", registerController.get);
registerRouter.post("/", registerController.post);
module.exports = registerRouter;
