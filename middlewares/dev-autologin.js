
module.exports = function(req, res, next) {
    const ENVIRONMENT = process.env.ENVIRONMENT;
    const ID_DEV_USER= process.env.ID_DEV_USER;
    if (ENVIRONMENT === "dev" && ID_DEV_USER) {
        req.session.id_user = ID_DEV_USER;
    }
    next();
}
