const modelLike = require("../models/like.model");
const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.getOrderById();
        const user = req.user;
        for (post of allPost) {
            post.user = await modelUser.find(post.id_user);
            post.nbLike = await modelLike.count(post.id_post);
            post.liked = await modelLike.isLiked(post.id_post, user.id_user);
        }
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            posts: allPost,
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
    dislike: async function (req, res, next) {
        const user = req.user;
        const idPost = Number(req.params.id_post);
        var success = await modelLike.dislikePost(
            idPost,
            user.id_user
        );
        if (success) {
            res.redirect("/feed");
        } else {
            res.redirect("?error=ERROR_DISLIKE_POST");
        }
    }
};
