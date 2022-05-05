const Publication = require("../models/post.model");
const UserHelper = require("../helpers/user.helper");
const Repository = require("../models/repository");

module.exports = {
    getPost: async function (req, res, next) {
        const allPost = await Repository.findAll("post");
        res.render("base", {
            template: "addPost",
            title: "Add post",
            stylePaths: [],
            scriptPaths: [],
            allPost : allPost
        });
    },
    addNewPost: async function (req, res, next) {
        const user = UserHelper.getUser(req);
        var success = await Publication.publish(
            // user.id_user,
            4,
            req.body.data_path,
            req.body.description
        );
        if (success) {
            res.redirect("/");
        } else {
            res.redirect("/addPost?error=ERROR_CREATION_POST");
        }
    },
};