module.exports = {
    getNotification: function (req, res, next) {
        res.json({
            title: "Notification",
        });
    },

    getNotificationPage: function (req, res, next) {
        res.render("base", {
            template: 'notification',
            title: "Notification",
            stylePaths: [],
            scriptPaths: [],
        });
    }
};
