require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PROTOCOL = process.env.WEB_PROTOCOL;
const HOST = process.env.WEB_HOSTNAME;
const PORT = 3000;

/**
 * display request in console
 */
if (process.env.ENVIRONMENT === "dev") {
    app.use((req, res, next) => {
        const dateNow = Date.now();
        next();
        const dateAfter = Date.now();
        const elapsedTime = dateAfter - dateNow;
        console.log(
            `${req.statusCode || 404} ${req.method} ${req.url} ${elapsedTime}ms`
        );
    });
}

/**
 * CORS
 */
app.use(
    cors({
        origin: `${PROTOCOL}://${HOST}:${PORT}`,
    })
);

app.use(express.json());

/**
 * starting the server
 */
app.listen(PORT, () => {
    console.log(
        `listening on ${PROTOCOL}://${HOST}:${process.env.WEB_PORT_EXTERNAL}`
    );
});
