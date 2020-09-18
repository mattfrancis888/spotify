"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var keys_1 = require("./config/keys");
var artistsRoutes_1 = __importDefault(require("./routes/artistsRoutes"));
var songsRoutes_1 = __importDefault(require("./routes/songsRoutes"));
var mongoose = require("mongoose");
// const keys = require("./config/keys");
var app = express_1.default();
var cors = require("cors");
var bodyParser = require("body-parser");
//  middleware for parsing json objects - eg; able to acess req.body
app.use(bodyParser.json());
// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: true }));
//CORS
app.use(cors());
//Connect to database
mongoose.connect(keys_1.keys.mongoURI, { useNewUrlParser: true });
//Models
require("./models/Artists");
require("./models/Songs");
//Routes
app.use("/artists", artistsRoutes_1.default);
app.use("/songs", songsRoutes_1.default);
//require("./routes/artistsRoutes")(app);
// require("./routes/songsRoutes")(app);
var PORT = process.env.PORT || 5000;
//TODO: FIX LATER - SERVING UP EXPRES STATIC
//Production
// const path = require("path");
// app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)
// app.get("/*", function (req, res) {
//     res.sendFile(path.join(__dirname, "index.html"));
// });
// if (process.env.NODE_ENV === "production") {
//     console.log("I'M IN PRODUCTION");
//     // Express will serve up production assets
//     // like our main.js file, or main.css file!
//     app.use(express.static("client/build"));
//     // Express will serve up the index.html file
//     // if it doesn't recognize the route
//     const path = require("path");
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }
app.listen(PORT);
