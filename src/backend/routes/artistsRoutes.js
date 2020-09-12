const mongoose = require("mongoose");
const Artists = mongoose.model("artists");
//reference artists collection

module.exports = (app) => {
    app.get("/artists", async (req, res) => {
        const artists = await Artists.find({});
        res.send(artists);
    });
    app.get("/artists/:artistId", async (req, res) => {
        const artist = await Artists.find({ _id: req.params.artistId });
        res.send(artist);
    });
};
