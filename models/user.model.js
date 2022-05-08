const bcrypt = require("bcryptjs");

var UserRepository = require("./repository").init("user");
/**
 * Register a new user
 * @param {string} email
 * @param {string} password
 * @param {string} firstname
 * @param {string} lastname
 * @param {boolean} accept_email
 * @param {string} country
 * @param {string} birth
 */
UserRepository.register = async function (
    email,
    password,
    firstname,
    lastname,
    is_email_authorized,
    country,
    date_of_birth,
    avatar
) {
    var hash = bcrypt.hashSync(password, 10);
    if (!(await this.userExist(email))) {
        await this.insert({
            email: email,
            password: hash,
            firstname: firstname,
            lastname: lastname,
            is_email_authorized: is_email_authorized,
            country: country,
            date_of_birth: date_of_birth,
            picture_path: avatar || "",
        });
        return true;
    } else {
        return false;
    }
};

UserRepository.findOneByEmail = async function (email) {
    return await this.findOneBy("email", email);
};

UserRepository.userExist = async function (email) {
    return (await this.findOneBy("email", email)) !== null;
};

UserRepository.updateProfile = async function (
    user,
    email,
    country,
    date_of_birth
) {
    return await this.update(user.id_user, {
        email: email,
        country: country,
        date_of_birth: date_of_birth,
    });
};
UserRepository.getById = async function (id) {
    return await this.findOneBy("id_user", id);
};

module.exports = UserRepository;
