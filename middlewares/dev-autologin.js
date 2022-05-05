
module.exports = function(req, res, next) {
    if (process.env.ENVIRONMENT === "dev") {
        req.session.id_user = 10;
    }
    next();
}
