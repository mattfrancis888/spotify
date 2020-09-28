import { Router, Request, Response } from "express";
// const Artists = mongoose.model("artists");
import Artists from "../models/Artists";

//reference artists collection
const router = Router();
interface RequestWithBody extends Request {
    body: { [key: string]: number | undefined };
}

//https://rahmanfadhil.com/express-rest-api/
//REST requests with mongoose article

router.get("/", async (req: RequestWithBody, res: Response) => {
    const artists = await Artists.find({});
    res.send(artists);
});
router.get("/:artistId", async (req, res: Response) => {
    const artist = await Artists.find({ _id: req.params.artistId });
    res.send(artist);
});
router.patch(
    "/:artistId/hearts",
    async (req: RequestWithBody, res: Response) => {
        try {
            const artist = await Artists.findOne({
                _id: req.params.artistId,
            });
            // console.log(req.body);
            if (artist) {
                if (req.body.hearts) {
                    artist.hearts = req.body.hearts;
                }
                // console.log(artist.hearts);
                await artist.save();
                res.send(artist);
            }
        } catch {
            res.status(404);
            res.send({ error: "Artist doesn't exist!" });
        }
    }
);

export default router;
// import mongoose from "mongoose";
// const Artists = mongoose.model("artists");
// module.exports = (app) => {
//     //https://rahmanfadhil.com/express-rest-api/
//     //REST requests with mongoose article

//     app.get("/artists", async (req, res) => {
//         const artists = await Artists.find({});
//         res.send(artists);
//     });
//     app.get("/artists/:artistId", async (req, res) => {
//         const artist = await Artists.find({ _id: req.params.artistId });
//         res.send(artist);
//     });
//     app.patch(
//         "/artists/:artistId/hearts",
//         async (req, res) => {
//             try {
//                 const artist = await Artists.findOne({
//                     _id: req.params.artistId,
//                 });
//                 // console.log(req.body);

//                 if (req.body.hearts) {
//                     artist.hearts = req.body.hearts;
//                 }
//                 // console.log(artist.hearts);
//                 await artist.save();
//                 res.send(artist);
//             } catch {
//                 res.status(404);
//                 res.send({ error: "Artist doesn't exist!" });
//             }
//         }
//     );
// };
