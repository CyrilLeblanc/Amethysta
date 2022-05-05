const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");

router.get("/notification", controller.getNotification);

module.exports = router;
