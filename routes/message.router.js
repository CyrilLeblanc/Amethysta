const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.controller");

router.get("/new", controller.createConversationForm);
router.post("/new", controller.handleConversationForm);
router.get("/:id_conversation", controller.displayConversation);
router.post("/:id_conversation/send", controller.sendMessage);
router.get("/", controller.displayConversationList);

module.exports = router;
