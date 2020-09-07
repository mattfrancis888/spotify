const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
    fistName: String,
    lastName: String,
    hearts: Number,
});

mongoose.model("artists", artistSchema);
