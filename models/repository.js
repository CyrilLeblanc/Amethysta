const mysql = require("./mysql");

module.exports = {
    // table: undefined,
    init: function (table) {
        return Object.assign({}, require("./repository"), { table: table });
    },
    setTable: (table) => {
        this.table = table;
        return this;
    },

    /**
     * Retrieve an object based on id
     * @param {int} id
     * @returns Promise
     */
    find: function (id) {
        return new Promise((resolve, reject) => {
            mysql.execute(
                `SELECT * FROM ${this.table} WHERE id_${this.table} = ? LIMIT 1`,
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (typeof results === "object" && results.length > 0) {
                            resolve(results[0]);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    },

    /**
     * Retrieve all object based on table
     * @returns Promise
     */
    findAll: function () {
        return new Promise((resolve, reject) => {
            mysql.query(`SELECT * FROM ${this.table}`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    /**
     * Retrieve all object based on given value and table
     * @param {string} column
     * @param {*} value
     * @returns Promise
     */
    findAllBy: function (column, value) {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT * FROM ${this.table} WHERE ${column} = ?`,
                [value],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    /**
     * Retrieve one object retrieved by column and value
     * @param {string} column
     * @param {*} value
     * @returns Promise
     */
    findOneBy: function (column, value) {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT * FROM ${this.table} WHERE ${column} = ? LIMIT 1`,
                [value],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (typeof results === "object" && results.length > 0) {
                            resolve(results[0]);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    },

    /**
     * update an object corresponding with id
     * @param {int} id
     * @param {object} data
     * @returns Promise
     */
    update: function (id, data) {
        return new Promise((resolve, reject) => {
            mysql.query(
                `UPDATE ${this.table} SET ? WHERE id_${this.table} = ?`,
                [data, id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    /**
     * Insert an object in database
     * @param {object} data
     * @returns Promise
     */
    insert: function (data) {
        return new Promise((resolve, reject) => {
            mysql.query(
                `INSERT INTO ${this.table} SET ?`,
                [data],
                async (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        const lastInsertedId = await this.getLastInsertId();
                        const lastInsertedEntity = await this.find(lastInsertedId);
                        resolve(lastInsertedEntity);
                    }
                }
            );
        });
    },

    getLastInsertId: function () {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT LAST_INSERT_ID() as id FROM ${this.table}`,
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        const lastInsertedId = results[0].id;
                        resolve(lastInsertedId);
                    }
                }
            );
        });
    },
};
