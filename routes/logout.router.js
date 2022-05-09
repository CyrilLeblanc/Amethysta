const express = require("express");
const controller = require("../controllers/logout.controller");
const router = express.Router();

router.get("/", controller.logout);

module.exports = router;
