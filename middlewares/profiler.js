module.exports = function (req, res, next) {
    const dateNow = Date.now();
    next();
    const dateAfter = Date.now();
    const elapsedTime = dateAfter - dateNow;
    console.log(`${res.statusCode} ${req.method} ${req.url} ${elapsedTime}ms`);
};
