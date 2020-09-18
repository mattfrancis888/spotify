// const mongoose = require("mongoose");
// const { Schema } = mongoose;

import mongoose, { Schema } from "mongoose";

interface IArtist extends mongoose.Document {
    fistName: string;
    lastName: string;
    image: string;
    backgroundImage: string;
    hearts: number;
}

const artistSchema = new Schema({
    fistName: String,
    lastName: String,
    image: String,
    backgroundImage: String,
    hearts: Number,
});

export default mongoose.model<IArtist>("artists", artistSchema);
