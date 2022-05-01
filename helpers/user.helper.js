module.exports = {
    isConnected: function (req) {
        return !!req.session.user;
    }
}
