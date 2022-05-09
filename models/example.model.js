var repo = require("./repository").init("user");

module.exports = {
    getAllExample: async function () {
        return await repo.findAll();
    },
};
