// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const SongSchema = require("./Song");
import { songScehma, ISong } from "./Song";
import mongoose, { Schema } from "mongoose";

export interface ISongs extends mongoose.Document {
    songs: ISong[];
    _artist: Schema.Types.ObjectId;
}

const songsSchema = new Schema({
    songs: [songScehma],
    _artist: { type: Schema.Types.ObjectId, ref: "Artist" },
});

export default mongoose.model("songs", songsSchema);
