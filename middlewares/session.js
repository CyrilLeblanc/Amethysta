module.exports = require("express-session")({
    secret: process.env.SECRET_TOKEN,
    saveUninitialized: false,
    resave: false,
});
