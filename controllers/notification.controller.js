module.exports = {
    
    getNotificationPage: function (req, res, next) {
        res.render("base", {
            template: 'notification',
            title: "Notification",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
