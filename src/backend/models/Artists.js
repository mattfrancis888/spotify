const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
    fistName: String,
    lastName: String,
    image: String,
    hearts: Number,
});

mongoose.model("artists", artistSchema);
