const MessageModel = require("./message.model");
const UserModel = require("./user.model");
const mysql = require("./mysql");

var ConversationModel = require("./repository").init("conversation");

ConversationModel.getByUser = function (user) {
    return new Promise(async (resolve, reject) => {
        mysql.execute(
            `SELECT * FROM ${this.table} WHERE user_to_user LIKE ? OR user_to_user LIKE ?`,
            [`${user.id_user},%`, `%,${user.id_user}`],
            async (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(await this.hydrateMultiple(results));
            }
        );
    });
};

ConversationModel.hydrateMultiple = async function (conversations) {
    for (conversation of conversations) {
        conversation = await this.hydrate(conversation);
    }
    return conversations;
}

ConversationModel.hydrate = async function (conversation) {
    conversation.users = await this.getUsersByConversation(conversation);
    return conversation;
};

ConversationModel.getUsersByConversation = async function (conversation) {
    const user_ids = conversation.user_to_user.split(",");
    var users = [];
    for (user_id of user_ids) {
        var user = await UserModel.find(user_id);
        users.push(user);
    }
    return users;
};

ConversationModel.getById = async function (id_conversation) {
    return await this.find(id_conversation);
};

ConversationModel.create = async function (user1, user2) {
    return await this.insert({
        user_to_user: `${user1.id_user},${user2.id_user}`,
    });
};

module.exports = ConversationModel;
