const mysql = require("./mysql");
var PostRepository = require("./repository").init("post");

/**
 * post a new publication
 * @param {number} id_user
 * @param {string} data_path
 * @param {string} description
 */

PostRepository.publish = async function (id_user, data_path, description) {
    await this.insert({
        id_user: id_user,
        data_path: data_path,
        description: description,
    });
    return true;
};

PostRepository.getAllByUser = function (user) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            "SELECT * FROM post WHERE id_user = ?",
            [user.id_user],
            (err, rows) => {
                if (err) {
                    throw err;
                }
                resolve(rows);
            }
        );
    });
};

PostRepository.getAllHydratedByUser = async function (user) {
    const posts = await this.getAllByUser(user);
    return await PostRepository.hydrateMultiple(posts);
}

PostRepository.hydrate = async function (post) {
    post.user = await UserRepository.find(post.id_user);
};

PostRepository.hydrateMultiple = async function (posts) {
    for (post of posts) {
        post = await PostRepository.hydrate(post);
    }
    return posts;
};

module.exports = PostRepository;
