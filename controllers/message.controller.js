const UserHelper = require("../helpers/user.helper");
const MessageModel = require("../models/message.model");
const ConversationModel = require("../models/conversation.model");


module.exports = {
    displayConversationList: async function (req, res, next) {
        var user = await UserHelper.getUser(req);
        var conversations = await ConversationModel.getByUser(user);
        res.render("base", {
            template: "conversations_list",
            title: "Conversations",
            stylePaths: [],
            scriptPaths: [],
            user: user,
            conversations: conversations,
        });
    },
    displayConversation: async function (req, res, next) {
        var messages = await MessageModel.getByConversation(
            req.params.id_conversation
        );
        res.render("base", {
            template: "conversation",
            title: "Message",
            stylePaths: [],
            scriptPaths: [],
            messages: messages,
        });
    },
    createConversationForm: async function (req, res, next) {
        res.render("base", {
            template: "new_conversation",
            title: "New Conversation",
            stylePaths: [],
            scriptPaths: [],
        });
    },
    handleConversationForm: async function (req, res, next) {
        var current_user = await UserHelper.getUser(req.session.userId);
        var second_user = await UserModel.getById(req.body.id_user);
        var conversation = await ConversationModel.create(
            current_user,
            second_user
        );
        res.redirect("/message/" + conversation.id);
    },
    sendMessage: async function (req, res, next) {
        var user = await UserHelper.getUser(req.session.userId);
        var conversation = await ConversationModel.getById(
            req.params.id_conversation
        );
        var message = await MessageModel.create(conversation, user);
        res.json(message);
    },
};
