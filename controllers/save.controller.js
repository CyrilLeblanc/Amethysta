const PostModel = require("../models/post.model");
const SaveModel = require("../models/save.model");

module.exports = {
    savePost: async function (req, res) {
        const id_post = req.params.id_post;
        const user = req.user;
        const post = await PostModel.find(id_post);
        await SaveModel.toggle(user, post);
        res.redirect("/");
    },
};
