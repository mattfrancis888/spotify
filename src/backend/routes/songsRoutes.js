const mongoose = require("mongoose");
const Songs = mongoose.model("songs");

module.exports = (app) => {
    //Get songs by artist via artist id
    app.get("/songs/:artistId", async (req, res) => {
        const songs = await Songs.find({ _artist: req.params.artistId });
        res.send(songs);
    });
};
