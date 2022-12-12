const express = require("express");
const compression = require("compression");

const app = express();
app.use(express.static(`${__dirname}/dist`));
app.use(compression());

app.get("/", (req, res)=>{
    return res.sendFile(`${__dirname}/dist/index.html`);
});

module.exports = app;