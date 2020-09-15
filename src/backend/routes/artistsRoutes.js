const mongoose = require("mongoose");
const Artists = mongoose.model("artists");
//reference artists collection

module.exports = (app) => {
    //https://rahmanfadhil.com/express-rest-api/
    //REST requests with mongoose article

    app.get("/artists", async (req, res) => {
        const artists = await Artists.find({});
        res.send(artists);
    });
    app.get("/artists/:artistId", async (req, res) => {
        const artist = await Artists.find({ _id: req.params.artistId });
        res.send(artist);
    });
    app.patch("/artists/:artistId/hearts", async (req, res) => {
        try {
            const artist = await Artists.findOne({ _id: req.params.artistId });
            // console.log(req.body);

            if (req.body.hearts) {
                artist.hearts = req.body.hearts;
            }
            // console.log(artist.hearts);
            await artist.save();
            res.send(artist);
        } catch {
            res.status(404);
            res.send({ error: "Artist doesn't exist!" });
        }
    });
};
