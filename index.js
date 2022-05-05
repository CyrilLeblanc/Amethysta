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
    "express-session",
    "cookie-parser",
    "access-limiter",
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
app.use("/message", require(`${routeDir}/message.router`));
app.use("/profile", require(`${routeDir}/profile.router`));
app.use("/notification", require(`${routeDir}/notification.router`));
app.use("/comments", require(`${routeDir}/comments.router`));
app.use("/", require(`${routeDir}/index.router`));

// =====================================================
// Starting the server
// =====================================================
const PROTOCOL = process.env.WEB_PROTOCOL;
const HOST = process.env.WEB_HOSTNAME;
const WEB_EXTERNAL_PORT = process.env.WEB_EXTERNAL_PORT;
app.listen(3000, () => {
    console.log(`listening on ${PROTOCOL}://${HOST}:${WEB_EXTERNAL_PORT}`);
});
