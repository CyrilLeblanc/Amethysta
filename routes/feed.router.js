const express = require("express");
const feedController = require("../controllers/feed.controller");

const feedRouter = express.Router();
feedRouter.get("/", feedController.getFeedPage);
feedRouter.get("/like/:id_post", feedController.addLike);
feedRouter.get("/dislike/:id_post", feedController.dislike);
module.exports = feedRouter;
