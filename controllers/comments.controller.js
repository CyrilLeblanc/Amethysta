module.exports = {
    getComments: function (req, res, next) {
        res.json({
            title: "Comments",
        });
    },

    getCommentsPage: function (req, res, next) {
        res.render("base", {
            template: 'comments',
            title: "Comments",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
