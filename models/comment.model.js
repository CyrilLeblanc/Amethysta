const CommentModel = require("./repository").init("comment");
const UserModel = require("../models/user.model");
const mysql = require("./mysql");

CommentModel.add = async function (post, user, content) {
    return await this.insert({
        id_post: post.id_post,
        id_user: user.id_user,
        content: content,
    });
};

CommentModel.get = function (post) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            `SELECT * FROM ${this.table} WHERE id_post = ? ORDER BY id_comment DESC`,
            [post.id_post],
            (err, results) => {
                if (err) {
                    throw err;
                }
                resolve(results);
            }
        );
    });
};

CommentModel.count = function (post) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            `SELECT COUNT(*) AS nb_comment FROM ${this.table} WHERE id_post = ?`,
            [post.id_post],
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results[0].nb_comment);
            }
        );
    });
};

CommentModel.getHydrated = async function (post) {
    const comments = await this.get(post);
    for (comment of comments) {
        comment = await this.hydrate(comment);
        console.log(comment);
    }
    return comments;
};

CommentModel.hydrate = async function (comment) {
    comment.user = await UserModel.find(comment.id_user);
    comment.post = post;
    return comment;
}

module.exports = CommentModel;
