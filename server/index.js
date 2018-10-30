const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
// think of morgan and bodyparser as add ons
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static("./public"));

// enclosed is the request handle. ie closure function
// app.get("/", (req, res) => {
//     res.send("Hello World");
// })

// port can be any number apparently
const port = process.env.PORT || 5000;

// a function for listening to app
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})