const express = require("express");
const router = express.Router();
const controller = require("../controllers/qrcode.controller");

router.get("/:id_user", controller.getQrcodePage);

module.exports = router;
