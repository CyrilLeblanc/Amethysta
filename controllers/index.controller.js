const UserHelper = require("../helpers/user.helper");
module.exports = {
    index: async function (req, res, next) {
        if (! await UserHelper.isLoggedIn(req)) {
            res.redirect("/login");
        } else {
            res.redirect("/feed");
        }
    },
};
