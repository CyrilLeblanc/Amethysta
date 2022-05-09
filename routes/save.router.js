const express = require("express");
const controller = require("../controllers/save.controller");
const router = express.Router();

router.post("/:id_post", controller.savePost);

module.exports = router;
