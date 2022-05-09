const UserHelper = require("../helpers/user.helper");
const UserModel = require("../models/user.model");
const SaveModel = require("../models/save.model");
module.exports = {

    getProfilePage: async function (req, res, next) {
        var user = req.user;
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        var posts = await SaveModel.getHydratedSavedPostsByUser(user);
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            user: user,
            posts: posts
        });
    },

    changeUserInfos: async function(req, res, next) {
        var user = req.user;
        var email = req.body.email;
        var country = req.body.country;
        var date_of_birth = req.body.date_of_birth;
        UserModel.updateProfile(user, email, country, date_of_birth);
        res.redirect("/");
    },
};
