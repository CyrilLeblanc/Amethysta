const UserHelper = require("../helpers/user.helper");
const UserModel = require("../models/user.model");

module.exports = {

    getProfilePage: async function (req, res, next) {
        var user = await UserHelper.getUser(req);
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            user: user,
        });
    },

    changeUserInfos: async function(req, res, next) {
        var user = await UserHelper.getUser(req);
        var email = req.body.email;
        var country = req.body.country;
        var date_of_birth = req.body.date_of_birth;
        UserModel.updateProfile(user, email, country, date_of_birth);
        res.redirect("/");
    }
};
