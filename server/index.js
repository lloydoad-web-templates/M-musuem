const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
// think of morgan and bodyparser as add ons
app.use(morgan("tiny"));
app.use(bodyParser.json());

// enclosed is the request handle. ie closure function
app.get("/", (req, res) => {
    res.send("Hello World");
})