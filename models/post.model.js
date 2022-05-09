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

module.exports = PostModel;
