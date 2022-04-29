module.exports = {
    getExample: function (req, res, next) {
        res.json({
            title: "Example",
            message: "This is the example page.",
        });
    },

    getExamplePage: function (req, res, next) {
        res.render("base", {
            template: 'example',
            title: "Example",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
