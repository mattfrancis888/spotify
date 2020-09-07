const mongoose = require("mongoose");
const Artists = mongoose.model("artists");
//reference artists collection

module.exports = (app) => {
    app.get("/", async (req, res) => {
        const artists = await Artists.find({});
        console.log(artists);
        res.send(artists);
    });
};
