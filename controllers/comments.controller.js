module.exports = {
    
    getCommentsPage: function (req, res, next) {
        res.render("base", {
            template: 'comments',
            title: "Comments",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
