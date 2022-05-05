const MessageModel = require("./message.model");
var ConversationModel = require("./repository");

ConversationModel.getByUser = async function (user) {
    return await this.findAllBy("id_user", user.id_user);
};
ConversationModel.getById = async function (id_conversation) {
    return await this.find(id_conversation);
};

ConversationModel.create = async function (user1, user2) {};

module.exports = ConversationModel;
