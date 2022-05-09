/**
 * This fixture will purge the database from fixtures data.
 */

const sql = require("../models/mysql");

module.exports = async function () {
    return await sql.execute(
        "DELETE FROM user WHERE NOT id_user = 1;"
    );
};
