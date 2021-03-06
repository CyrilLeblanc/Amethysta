const UserModel = require("../models/user.model");
const SaveModel = require("../models/save.model");
const LikeModel = require("../models/like.model");
const CommentModel = require("../models/comment.model");
module.exports = {

    getProfilePage: async function (req, res, next) {
        var user = req.user;
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        var posts = await SaveModel.getHydratedSavedPostsByUser(user);
        for (post of posts) {
            post.user = await UserModel.find(post.id_user);
            post.nbLike = await LikeModel.count(post.id_post);
            post.liked = await LikeModel.isLiked(post.id_post, user.id_user);
            post.isSaved = await SaveModel.isSaved(user, post);
            post.commentCount = await CommentModel.count(post);
        }
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            targetUser: user,
            user: user,
            posts: posts
        });
    },

    otherUserProfile: async function(req, res, next) {
        var targetUser = await UserModel.find(req.params.id_user);
        targetUser.date_of_birth = targetUser.date_of_birth.toISOString().split('T')[0];
        var user = req.user;
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        var posts = await SaveModel.getHydratedSavedPostsByUser(user);
        for (post of posts) {
            post.user = await UserModel.find(post.id_user);
            post.nbLike = await LikeModel.count(post.id_post);
            post.liked = await LikeModel.isLiked(post.id_post, user.id_user);
            post.isSaved = await SaveModel.isSaved(user, post);
        }
        res.render("base", {
            template: 'profile',
            title: "Profile",
            stylePaths: [],
            scriptPaths: [],
            targetUser: targetUser,
            user: user,
            posts: posts
        });
    },

    changeUserInfos: async function(req, res, next) {
        var user = req.user;
        var email = req.body.email;
        var country = req.body.country;
        var date_of_birth = req.body.date_of_birth;
        UserModel.updateProfile(user, email, country, date_of_birth);
        res.redirect("/");
    },
};
