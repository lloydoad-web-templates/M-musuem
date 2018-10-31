const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const journals = require("./db/journals");

const app = express();
// think of morgan and bodyparser as add ons
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.static("./public"));

app.post("/api/make-journal", async (req, res) => {
    console.log(req);

    try {
        // creating an entry in collection
        const url = await journals.create(req.params.name, req.body);
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(url);
    }
});

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