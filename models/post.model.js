var PostModel = require("./repository").init("post");
const sql = require("./mysql");

/**
 * post a new publication
 * @param {number} id_user
 * @param {string} data_path
 * @param {string} description
 */

PostModel.publish = async function (id_user, data_path, description) {
    await this.insert({
        id_user: id_user,
        data_path: data_path,
        description: description,
    });
    return true;
};

PostModel.getOrderById = function () {
    return new Promise((resolve, reject) => {
        sql.execute(
            `SELECT * FROM ${this.table} ORDER BY id_${this.table} DESC;`,
            [],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};

PostModel.getAllByUser = function (user) {
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

PostModel.getAllHydratedByUser = async function (user) {
    const posts = await this.getAllByUser(user);
    return await PostModel.hydrateMultiple(posts);
}

PostModel.hydrate = async function (post) {
    post.user = await UserRepository.find(post.id_user);
};

PostModel.hydrateMultiple = async function (posts) {
    for (post of posts) {
        post = await PostModel.hydrate(post);
    }
    return posts;
};

module.exports = PostModel;
