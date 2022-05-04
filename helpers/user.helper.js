var UserModel = require('../models/user.model');

module.exports = {
    isConnected: function (req) {
        return !!req.session.id_user;
    },
    getUser: async function(req) {
        if (this.isConnected(req)) {
            var UserModel = require('../models/user.model');
            var user = await UserModel.find(req.session.id_user);
            return user;
        } else {
            return "not connected";
        }
    }
}
