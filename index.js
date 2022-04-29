require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PROTOCOL = process.env.WEB_PROTOCOL;
const HOST = process.env.WEB_HOSTNAME;
const PORT = 3000;

if (process.env.ENVIRONMENT === "dev") {
    app.use(require("./middlewares/profiler"));
}

app.set('view engine', 'ejs');
app.use(express.json());
app.use(
    cors({
        origin: `${PROTOCOL}://${HOST}:${PORT}`,
    })
);

app.use("/example", require("./routes/example.router"));

/**
 * starting the server
 */
app.listen(PORT, () => {
    console.log(
        `listening on ${PROTOCOL}://${HOST}:${process.env.WEB_EXTERNAL_PORT}`
    );
});
