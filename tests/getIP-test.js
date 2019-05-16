const request = require("request");

request("https://api.ipify.org", (err, res, body) => {
    if (err) return console.log("Failed");
    console.log(body);
    console.log("passed");
});