module.exports = {
    getExample: function (req, res, next) {
        res.json({
            title: "Example",
            message: "This is the example page.",
        });
    },
};
