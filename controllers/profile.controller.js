module.exports = {
    
    getProfilePage: function (req, res, next) {
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
