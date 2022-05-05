const UserHelper = require("../helpers/user.helper");

module.exports = function (req, res, next) {
    const restrictedUrls = ["/login", "/register"];
    var isUserLoggedIn = UserHelper.isLoggedIn(req);
    var accessToForbiddenUrl = restrictedUrls.includes(req.url);

    if (isUserLoggedIn ^ accessToForbiddenUrl || req.url === "/") {
        next();
    } else {
        res.redirect("/");
    }
};
