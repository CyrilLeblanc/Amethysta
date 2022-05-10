const UserHelper = require("../helpers/user.helper");
const UserModel = require("../models/user.model");

module.exports = {

    getProfilePage: async function (req, res, next) {
        var user = req.user;
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            targetUser: user,
            user: user,
        });
    },

    otherUserProfile: async function(req, res, next) {
        var targetUser = await UserModel.find(req.params.id_user);
        targetUser.date_of_birth = targetUser.date_of_birth.toISOString().split('T')[0];
        var user = req.user;
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            targetUser: targetUser,
            user: user
        });
    },

    changeUserInfos: async function(req, res, next) {
        var user = req.user;
        var email = req.body.email;
        var country = req.body.country;
        var date_of_birth = req.body.date_of_birth;
        UserModel.updateProfile(user, email, country, date_of_birth);
        res.redirect("/");
    }
};
