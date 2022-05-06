var PostRepository = require("./repository").init("post");

/**
 * post a new publication
 * @param {number} id_user
 * @param {string} data_path
 * @param {string} description
 */

PostRepository.publish = async function (
    id_user,
    data_path,
    description
) {
    await this.insert({
        id_user: id_user,
        data_path: data_path,
        description: description
    });
    return true;
}

module.exports = PostRepository;