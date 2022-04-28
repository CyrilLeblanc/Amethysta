require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const PROTOCOL = process.env.PROTOCOL || "http";
const HOST = process.env.HOST || "localhost";
const PORT = 3000;

app.use(express.json());

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
            `${req.method} ${req.url} ${elapsedTime}ms`
        )
    })
}

/**
 * CORS
 */
app.use(
    cors({
        origin: `${PROTOCOL}://${HOST}:${PORT}`,
    })
);

/**
 * starting the server
 */
app.listen(PORT, () => {
    console.log(
        `\n\n\n\n\n\n\n\n` + 
        `listening on ${PROTOCOL}://${HOST}:${process.env.PORT_EXTERNAL}`
    );
});
