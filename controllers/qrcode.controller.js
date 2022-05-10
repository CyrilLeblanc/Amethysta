const UserModel = require("../models/user.model");
module.exports = {

    getQrcodePage: async function (req, res, next) {
        const user = await UserModel.find(req.params.id_user);
        res.render("base", {
            template: 'qrcode',
            title: "Qrcode",
            stylePaths: [],
            scriptPaths: [],
            qrcode: encodeURI(process.env.WEB_PROTOCOL + "://" + process.env.WEB_HOSTNAME + ":" + process.env.WEB_EXTERNAL_PORT + "/profile/" + user.id_user)
        });
    },
}
