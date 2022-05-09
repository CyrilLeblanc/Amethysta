const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.findAll();
        for (post of allPost) {
            post.user = await modelUser.find(post.id_user);
        }
        console.log(allPost)
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            allPost: allPost,
        });
    }
};
