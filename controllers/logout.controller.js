module.exports = {
    logout: function (req, res, next) {
        req.session.id_user = undefined;
        res.redirect("/");
    }
}
