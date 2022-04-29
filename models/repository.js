const mysql = require("./mysql");

const queryCallback = function (err, results) {
    if (err) {
        reject(err);
    } else {
        resolve(err);
    }
};

module.exports = {
    table: undefined,

    /**
     * Retrieve an object based on id
     * @param {int} id
     * @returns Promise
     */
    find: function (id) {
        return new Promise((resolve, reject) => {
            mysql.query(
                `SELECT * FROM ${this.table} WHERE id = ?`,
                [id],
                queryCallback
            );
        });
    },

    /**
     * Retrieve all object based on table
     * @returns Promise
     */
    findAll: function () {
        return new Promise((resolve, reject) => {
            mysql.query(`SELECT * FROM ${this.table}`, queryCallback);
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
                queryCallback
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
                queryCallback
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
                `UPDATE ${this.table} SET ? WHERE id = ?`,
                [data, id],
                queryCallback
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
                queryCallback
            );
        });
    },
};
