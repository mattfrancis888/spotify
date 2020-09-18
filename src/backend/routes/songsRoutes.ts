import { Router, Request, Response } from "express";
import Songs from "../models/Songs";

const router = Router();
router.get("/:artistId", async (req: Request, res: Response) => {
    const songs = await Songs.find({ _artist: req.params.artistId });
    res.send(songs);
});
export default router;
// const mongoose = require("mongoose");
// const Songs = mongoose.model("songs");

// module.exports = (app) => {
//     //Get songs by artist via artist id
//     app.get("/songs/:artistId", async (req, res) => {
//         const songs = await Songs.find({ _artist: req.params.artistId });
//         res.send(songs);
//     });
// };
