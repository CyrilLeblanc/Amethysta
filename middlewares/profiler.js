/**
 * This middleware is used to log the request in the console.
 */
module.exports = function (req, res, next) {
    var rootPath = req.url.split("/")[1];
    const disabledRootPath = ["data", "js", "css", "img", "node_modules"];
    const isEnabledRootPath = disabledRootPath.indexOf(rootPath) === -1;
    if (process.env.ENVIRONMENT === "dev" && isEnabledRootPath) {
        const dateNow = Date.now();
        next();
        const dateAfter = Date.now();
        const elapsedTime = dateAfter - dateNow;
        console.log(
            `${res.statusCode} ${req.method} ${req.url} ${elapsedTime}ms`
        );
    } else {
        next();
    }
};
