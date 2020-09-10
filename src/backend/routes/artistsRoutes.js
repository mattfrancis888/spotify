const mongoose = require("mongoose");
const Artists = mongoose.model("artists");
//reference artists collection

module.exports = (app) => {
    app.get("/artists", async (req, res) => {
        const artists = await Artists.find({});
        res.send(artists);
    });
};
