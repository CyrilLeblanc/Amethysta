/**
 * This middleware is used to access to logged in user object in req.user
 */
const UserHelper = require("../helpers/user.helper");
module.exports = async function (req, res, next) {
    req.user = await UserHelper.getUser(req);
    next();
}
