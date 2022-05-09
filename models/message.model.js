const ConversationModel = require("./conversation.model");
const UserModel = require("./user.model");
const mysql = require("./mysql");
var MessageModel = require("./repository").init("message");

MessageModel.getByConversation = function (conversation) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            "SELECT * FROM message WHERE id_conversation = ? ORDER BY date ASC LIMIT 100",
            [conversation.id_conversation],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            }
        );
    });
};
MessageModel.create = async function (conversation, user, content) {
    return await this.insert({
        id_conversation: conversation.id_conversation,
        id_user: user.id_user,
        content: content,
        date: new Date(),
    });
};
MessageModel.hydrateMultiple = async function (messages) {
    for (message of messages) {
        message = await this.hydrate(message);
    }
    return messages;
};
MessageModel.hydrate = async function (message) {
    message.user = await UserModel.find(message.id_user);
    return message;
};
module.exports = MessageModel;
