var UserModel = require("../models/user.model");

module.exports = {
    isLoggedIn: function (req) {
        return !!req.session.id_user;
    },

    getUser: async function (req) {
        if (this.isLoggedIn(req)) {
            var user = await UserModel.find(req.session.id_user);
            return user;
        } else {
            return null;
        }
    },
};
