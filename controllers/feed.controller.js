const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.getOrderById();
        for (post of allPost) {
            post.user = await modelUser.find(post.id_user);
        }
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            posts: allPost,
        });
    }
};
