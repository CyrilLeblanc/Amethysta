const mysql = require("./mysql");
var SaveModel = require("./repository").init("save");

SaveModel.toggle = async function (user, post) {
    if (await this.isSaved(user, post)) {
        await this.remove(user, post);
    } else {
        await this.save(user, post);
    }
};

SaveModel.isSaved = async function (user, post) {
    return (await this.getSave(user, post)).length > 0;
};

SaveModel.getSave = async function (user, post) {
    console.log(post);
    return new Promise((resolve, reject) => {
        mysql.execute(
            `SELECT * FROM ${this.table} WHERE id_user = ? AND id_post = ?`,
            [user.id_user, post.id_post],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};

SaveModel.save = async function (user, post) {
    return await this.insert({
        id_user: user.id_user,
        id_post: post.id_post,
    });
};

SaveModel.remove = async function (user, post) {
    var saves = await this.getSave(user, post);
    if (saves.length > 0) {
        return await this.delete(saves[0].id_save);
    }
};

module.exports = SaveModel;
