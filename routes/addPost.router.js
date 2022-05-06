const express = require("express");
const addPostController = require("../controllers/addPost.controller");

const addPostRouter = express.Router();
addPostRouter.get("/", addPostController.getPost);
addPostRouter.post("/", addPostController.addNewPost);
module.exports = addPostRouter;