const mongoose = require("mongoose");
const { Schema } = mongoose;

const songScehma = new Schema({
    title: String,
    image: String,
});

mongoose.model("song", songScehma);
