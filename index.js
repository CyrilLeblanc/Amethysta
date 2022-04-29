require("dotenv").config();
const express = require("express");
const app = express();

const PROTOCOL = process.env.WEB_PROTOCOL;
const HOST = process.env.WEB_HOSTNAME;
const PORT = 3000;

if (process.env.ENVIRONMENT === "dev") {
    app.use(require("./middlewares/profiler"));
}

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.use("/example", require("./routes/example.router"));
app.use("/feed", require("./routes/feed.router"));

/**
 * starting the server
 */
app.listen(PORT, () => {
    console.log(
        `listening on ${PROTOCOL}://${HOST}:${process.env.WEB_EXTERNAL_PORT}`
    );
});
