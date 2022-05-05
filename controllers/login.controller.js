const UserHelper = require("../helpers/user.helper");
const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

module.exports = {
    get: function (req, res, next) {
        if (!UserHelper.isLoggedIn(req)) {
            res.render("base", {
                template: "login",
                title: "Login",
                stylePaths: [],
                scriptPaths: [],
            });
        } else {
            res.redirect("/");
        }
    },
    post: async function (req, res, next) {
        if (!UserHelper.isLoggedIn(req)) {
            const user = await UserModel.findOneByEmail(req.body.email);
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                req.session.id_user = user.id_user;
                res.redirect("/");
            } else {
                res.redirect("/login?error=WRONG_CREDENTIALS");
            }
        } else {
            res.redirect("/");
        }
    },
};
