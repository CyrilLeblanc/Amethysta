const express = require("express");
const router = express.Router();
const controller = require("../controllers/comments.controller");

router.get("/:id_post/comments", controller.comments);

module.exports = router;
