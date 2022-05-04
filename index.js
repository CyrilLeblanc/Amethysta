require("dotenv").config();
const express = require("express");
const app = express();

// =====================================================
// Middlewares
// =====================================================
const middlewares = [
    "profiler",
    "static",
    "body-parser",
    "express-json",
    "session",
    "cookie-parser",
];
middlewares.forEach((middleware) => {
    app.use(require(`./middlewares/${middleware}`));
});

// =====================================================
// Routes
// =====================================================
const routeDir = "./routes";
app.set("view engine", "ejs");

app.use("/example", require(`${routeDir}/example.router`));
app.use("/register", require(`${routeDir}/register.router`));
app.use("/login", require(`${routeDir}/login.router`));
app.use("/feed", require("./routes/feed.router"));

// =====================================================
// Starting the server
// =====================================================
const PROTOCOL = process.env.WEB_PROTOCOL;
const HOST = process.env.WEB_HOSTNAME;
const WEB_EXTERNAL_PORT = process.env.WEB_EXTERNAL_PORT;
app.listen(3000, () => {
    console.log(`listening on ${PROTOCOL}://${HOST}:${WEB_EXTERNAL_PORT}`);
});
