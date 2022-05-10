const CommentModel = require("../models/comment.model");
const PostModel = require("../models/post.model");

module.exports = {
    get: async function (req, res, next) {
        const post = await PostModel.find(req.params.id_post);
        if (!post) {
            return res.status(404).json("Post not found");
        } else {
            const comments = await CommentModel.getHydrated(post);
            return res.status(200).json(comments);
        }
    },
    add: async function (req, res, next) {
        const post = await PostModel.find(req.params.id_post);
        if (!post) {
            return res.status(404).json("Post not found");
        } else {
            const user = req.user;
            const comment = await CommentModel.add(post, user, req.body.content);
            res.status(200).json(comment);
        }
    },
};
