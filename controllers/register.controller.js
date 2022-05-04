const User = require("../models/user.model");
const UserHelper = require("../helpers/user.helper");
module.exports = {
    get: function (req, res, next) {
        if (UserHelper.isConnected(req)) {
            res.redirect("/");
        } else {
            res.render("base", {
                template: "register",
                title: "Register",
                stylePaths: [],
                scriptPaths: [],
            });
        }
    },
    post: async function (req, res, next) {
        if (UserHelper.isConnected(req)) {
            res.redirect("/");
        } else {
            if (req.body.password.length < process.env.PASSWORD_MIN_LENGTH) {
                res.redirect("/register?error=PASSWORD_MIN_LENGTH");
            } else if (req.body.password !== req.body.confirmPassword) {
                res.redirect("/register?error=PASSWORD_CONFIRM");
            } else {
                var success = await User.register(
                    req.body.email,
                    req.body.password,
                    req.body.firstname,
                    req.body.lastname,
                    req.body.accept_email,
                    req.body.country,
                    req.body.date_of_birth
                );
                if (success) {
                    res.redirect("/");
                } else {
                    res.redirect("/register?error=EMAIL_ALREADY_EXIST");
                }
            }
        }
    },
};
