require("dotenv").config();
const fs = require("fs");
const { exit } = require("process");
fs.readdir(__dirname + "/fixtures", async (err, files) => {
    if (err) {
        throw err;
    }
    for (file of files) {
        if (file.endsWith(".js")) {
            var load = require(`./fixtures/${file}`);
            var name = file.replace(".js", "");
            var result = (await load()) ? "OK" : "FAIL";

            console.log(`${name}\t${result}`);
        }
    }
    console.log("\nAll fixtures loaded.");
    exit();
});
