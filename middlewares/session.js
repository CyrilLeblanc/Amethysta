module.exports = require("express-session")({
    secret: process.env.SECRET_TOKEN,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
});
