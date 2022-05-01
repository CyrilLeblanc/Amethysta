module.exports = {
    isConnected: function (req) {
        return !!req.session.id_user;
    }
}
