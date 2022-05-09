var LikeRepository = require("./repository").init("like");
const mysql = require("./mysql");
/**
 * add a like to a pubication
 * @param {number} id_post
 * @param {number} id_user
 */

LikeRepository.likePost = async function (
    id_post,
    id_user
) {
    await this.insert({
        id_user: id_user,
        id_post: id_post
    });
    return true;
},

LikeRepository.count = function (id_post) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            `SELECT count(*) as count FROM \`${this.table}\` WHERE id_post = ?`,
            [id_post],
            (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(
                    results[0].count
                )
            }
        )
    })
},

LikeRepository.isLiked = function (id_post, id_user) {
    return new Promise((resolve, reject) => {
        mysql.execute(
            `SELECT * FROM \`${this.table}\` WHERE id_post = ? AND id_user = ?`, [id_post, id_user],
            (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results.length > 0);
                }
            }
        )
    })
}

// LikeRepository.dislikePost = async function (
//     id_post,
//     id_user
// ) {
//     await this.remove({ // remove doesn't exist for the moment
        
//     })
// },

// LikeRepository.getId = async function (id_post, id_user) {
//     return await this.findAll2By("id_user", "id_post", id_user, id_post);
// },


module.exports = LikeRepository;