const Publication = require("../models/post.model");
const UserHelper = require("../helpers/user.helper");
const Repository = require("../models/post.model");

module.exports = {
    getPost: async function (req, res, next) {
        const allPost = await Repository.findAll();
        res.render("base", {
            template: "addPost",
            title: "Add post",
            stylePaths: [],
            scriptPaths: [],
            allPost: allPost
        });
    },
    addNewPost: async function (req, res, next) {
        const user = req.user;
        var success = await Publication.publish(
            user.id_user,
            req.body.data_path,
            req.body.description
        );
        if (success) {
            res.redirect("/feed");
        } else {
            res.redirect("/addPost?error=ERROR_CREATION_POST");
        }
    },
};
