module.exports = {
    getProfile: function (req, res, next) {
        res.json({
            title: "Profile",
        });
    },

    getProfilePage: function (req, res, next) {
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
