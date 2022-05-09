const UserModel = require("../models/user.model");
const download = require("image-downloader");
const PostModel = require("../models/post.model");
const faker = require("faker");

module.exports = async function () {
    var users = await UserModel.findAll();
    for (user of users) {
        for (let i = 0; i < 10; i++) {
            PostModel.publish(
                user.id_user,
                await getRandomPostImg(user.id_user, i),
                faker.lorem.sentence()
            );
        }
    }
    return true;
};

async function getRandomPostImg(id_user, i) {
    const url = "https://picsum.photos/200/300";
    const filepath = `${__dirname}/../public/data/post/${id_user}_${i}.jpg`;
    await download.image({
        url,
        dest: filepath,
    });
    return filepath.replace(__dirname + "/../public", "");
}
