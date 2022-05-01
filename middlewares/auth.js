/**
 * Middleware that authenticate the user
 */

const UserModel = require("../models/user.model");

module.exports = async function (req, res, next) {
    var session = req.session;

    if (session.user) {
        UserModel.find(session.user.id_user).then((result) => {
            session.user = result;
            next();
        });
    } else {
        next();
    }
};
