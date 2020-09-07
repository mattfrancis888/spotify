const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
app.get("/", (req, res) => {
    res.send({ hi: "bye" });
});
app.listen(5000);
