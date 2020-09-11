const mongoose = require("mongoose");
const { Schema } = mongoose;
const SongSchema = require("./Song");

const songsSchema = new Schema({
    songs: [SongSchema],
    _artist: { type: Schema.Types.ObjectId, ref: "Artist" },
});

mongoose.model("songs", songsSchema);
