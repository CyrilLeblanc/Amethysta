var repo = require("./repository");
repo.table = "example";

module.exports = {
    getAllExample: async function () {
        return await repo.findAll();
    },
};
