const Publication = require("../models/post.model");
const UserHelper = require("../helpers/user.helper");

module.exports = {
    getPost: function (req, res, next) {
        res.render("base", {
            template: "addPost",
            title: "Add post",
            stylePaths: [],
            scriptPaths: []
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

        }
    },
};