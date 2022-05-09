const modelLike = require("../models/like.model");
const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.getOrderById();
        for (post of allPost) {
            post.user = await modelUser.find(post.id_user);
            post.like = await modelLike.count(post.id_post);
            console.log(post.like);
        }
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            allPost: allPost,
        });
    },
    addLike: async function (req, res, next) {
        const user = req.user;
        const idPost = Number(req.params.id_post);
        var success = await modelLike.likePost(
            idPost,
            user.id_user
        );
        if (success) {
            res.redirect("/feed");
        } else {
            res.redirect("feed?error=ERROR_LIKE_POST");
        }
    },
};
