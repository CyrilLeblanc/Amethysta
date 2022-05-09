const express = require("express");
const feedController = require("../controllers/feed.controller");

const feedRouter = express.Router();
feedRouter.get("/", feedController.getFeedPage);
feedRouter.get("/:id_post", feedController.addLike);
module.exports = feedRouter;
