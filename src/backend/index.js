const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
let cors = require("cors");
//CORS
app.use(cors());

//Connect to database
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(cors());
//Models
require("./models/Artists");

//Routes
require("./routes/artistsRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
