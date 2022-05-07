/**
 * This middleware is used to log the request in the console.
 */
module.exports = function (req, res, next) {
    if (process.env.ENVIRONMENT === "dev") {
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
