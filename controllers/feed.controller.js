const modelPost = require("../models/post.model");
const modelUser = require("../models/user.model");

module.exports = {
    getFeedPage: async function (req, res, next) {
        var allPost = await modelPost.findAll();
        console.log("chouchou");
        console.log(allPost);

        allPost.forEach(async function(chat){
                chat.id_user = await modelUser.getById(chat.id_user);
        })
        console.log(allPost.lenght + " taille");
        for (let i = 0; i < allPost.lenght; i++) {

        }
        console.log(typeof allPost + " type");
        console.log(allPost);
        res.render("base", {
            template: 'feed',
            title: "Feed",
            stylePaths: [],
            scriptPaths: [],
            allPost: allPost,
        });
    },
};
