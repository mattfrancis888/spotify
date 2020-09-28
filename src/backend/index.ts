import express from "express";
import artistsRoutes from "./routes/artistsRoutes";
import songsRoutes from "./routes/songsRoutes";
const mongoose = require("mongoose");
const app = express();

let cors = require("cors");
const bodyParser = require("body-parser");
//  middleware for parsing json objects - eg; able to acess req.body
app.use(bodyParser.json());

// middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({ extended: true }));

//CORS
//Needed for PATCH requests in now.json
//Use proxy if we are deploying front-end and backend together
//No need for CORS
app.use(cors());
//Environment variables
//https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    require("dotenv").config();
}
console.log("NODE_ENV", process.env.NODE_ENV);
//Connect to database
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true });
////Regarding mongoURI;
//Ideally we would have 2 keys; 1 key for our development database
//the other 1 for production database

//Models
require("./models/Artists");
require("./models/Songs");
//Routes
app.use("/artists", artistsRoutes);
app.use("/songs", songsRoutes);
//require("./routes/artistsRoutes")(app);
// require("./routes/songsRoutes")(app);

const PORT = process.env.PORT || 5000;

//Production
// const path = require("path");
// if (process.env.NODE_ENV === "production") {
//     console.log("I'M IN PRODUCTION");
//Used to send JS files after npm run build generates the static files; another way of deploying app
//     app.use(express.static(path.join(__dirname, "../../../build")));
//     app.get("*", function (req, res) {
//         res.sendFile(path.join(__dirname, "../../../build"));
//     });
// }

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
