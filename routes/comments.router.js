const express = require("express");
const router = express.Router();
const controller = require("../controllers/comments.controller");

router.get("/:id_post/", controller.getCommentsPage);

module.exports = router;
