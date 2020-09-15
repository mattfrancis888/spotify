const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();

let cors = require("cors");
const bodyParser = require("body-parser");
//  middleware for parsing json objects - eg; used to return JSON after POST request
app.use(bodyParser.json());

// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
app.use(cors());

//Connect to database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

//Models
require("./models/Artists");
require("./models/Songs");
//Routes
require("./routes/artistsRoutes")(app);
require("./routes/songsRoutes")(app);

const PORT = process.env.PORT || 5000;

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
