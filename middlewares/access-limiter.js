/**
 * This middleware restrict access to some urls depending on
 * if the user is logged in or not.
 * 
 * The variable `restrictedUrls` is an array of urls that are
 * only accessible by not logged in users. The logged in user
 * will not be able to access these urls.
 */
const UserHelper = require("../helpers/user.helper");

module.exports = function (req, res, next) {
    const restrictedUrls = ["/login", "/register"];
    var isUserLoggedIn = UserHelper.isLoggedIn(req);
    var accessToForbiddenUrl = restrictedUrls.includes(req.url.split("?")[0]);

    if (isUserLoggedIn ^ accessToForbiddenUrl || req.url === "/") {
        next();
    } else {
        res.redirect("/");
    }
};
