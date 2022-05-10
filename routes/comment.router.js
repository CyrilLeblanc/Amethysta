const express = require("express");
const router = express.Router();
const controller = require("../controllers/comment.controller");

router.get("/get/:id_post/", controller.get);
router.post("/add/:id_post/", controller.add);

module.exports = router;
