module.exports = {
    getFeed: function (req, res, next) {
        res.json({
            title: "Feed",
        });
    },

    getFeedPage: function (req, res, next) {
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
