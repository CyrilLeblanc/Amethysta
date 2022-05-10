module.exports = {

    getQrcodePage: async function (req, res, next) {
        res.render("base", {
            template: 'qrcode',
            title: "Qrcode",
            stylePaths: [],
            scriptPaths: [],
        });
    },
}