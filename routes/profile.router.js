const express = require("express");
const router = express.Router();
const controller = require("../controllers/profile.controller");

router.get("/", controller.getProfilePage);
router.get("/:id_user", controller.otherUserProfile);
router.post("/", controller.changeUserInfos);

module.exports = router;
