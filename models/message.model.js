const ConversationModel = require("./conversation.model");
var MessageModel = require("./repository").init("message");

MessageModel.getByConversation = async function (conversation) {};
MessageModel.create = async function (conversation, user) {};
module.exports = MessageModel;
