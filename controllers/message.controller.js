const UserHelper = require("../helpers/user.helper");
const UserModel = require("../models/user.model");
const MessageModel = require("../models/message.model");
const ConversationModel = require("../models/conversation.model");

module.exports = {
    displayConversationList: async function (req, res, next) {
        var user = req.user;
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
    createConversationForm: async function (req, res, next) {
        const users = await UserModel.findAll();
        res.render("base", {
            template: "new_conversation",
            title: "New Conversation",
            stylePaths: [],
            scriptPaths: [],
            users: users,
        });
    },
    handleConversationForm: async function (req, res, next) {
        var current_user = req.user;
        var second_user = await UserModel.find(req.body.user);
        var conversation = await ConversationModel.create(
            current_user,
            second_user
        );
        res.redirect("/message/" + conversation.id_conversation);
    },
    displayConversation: async function (req, res, next) {
        var conversation = await ConversationModel.find(
            req.params.id_conversation
        );
        var hydratedConversation = await ConversationModel.hydrate(
            conversation
        );
        var messages = await MessageModel.getByConversation(
            hydratedConversation
        );
        var hydratedMessage = await MessageModel.hydrateMultiple(messages);

        var currentUser = req.user;

        res.render("base", {
            template: "conversation",
            title: "Message",
            stylePaths: [],
            scriptPaths: [],
            conversation: hydratedConversation,
            messages: hydratedMessage,
            formatDate: function (date) {
                var date = new Date(date);
                return date.toISOString().split("T")[0];
            },
            formatTime: function (date) {
                var date = new Date(date);
                return date.toISOString().split("T")[1].split(".")[0];
            },
            isMessageOwner: function (message) {
                return message.id_user === currentUser.id_user;
            }
        });
    },
    sendMessage: async function (req, res, next) {
        var user = req.user;
        var conversation = await ConversationModel.find(
            req.params.id_conversation
        );
        var message = await MessageModel.create(
            conversation,
            user,
            req.body.message
        );
        res.redirect("/message/" + conversation.id_conversation);
    },
};
