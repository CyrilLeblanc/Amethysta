const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.findAll();

        allPost.forEach(async function(chat){
                chat.id_user = await modelUser.getById(chat.id_user);
        })
        for (let i = 0; i < allPost.lenght; i++) {

        }
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            allPost: allPost,
        });
    },
};
