/**
 * This fixture will generate an amount of fake users.
 */
const UserModel = require("../models/user.model");
const download = require("image-downloader");
const faker = require("faker");
faker.setLocale("fr");

module.exports = async function () {
    for (let i = 0; i < 10; i++) {
        await UserModel.register(
            faker.internet.email(),
            "testtest",
            faker.name.firstName(),
            faker.name.lastName(),
            true,
            faker.address.country(),
            faker.date.past(50),
            await getRandomAvatar(i)
        );
    }
    return true;
};

async function getRandomAvatar(i) {
    const sex = (Math.random() * 100) % 2 > 1 ? "men" : "women";
    const num = Math.floor(Math.random() * 100);
    const url = `https://randomuser.me/api/portraits/${sex}/${num}.jpg`;
    const filepath = `${__dirname}/../public/data/profile/${i}.jpg`;
    await download.image({
        url,
        dest: filepath,
    });
    return filepath.replace(__dirname + "/../public", "");
}
