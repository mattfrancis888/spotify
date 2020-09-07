const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
console.log(mongoose.connection.readyState);
//Models
require("./models/Artists");

//Routes
require("./routes/artistsRoutes")(app);

app.listen(5000);
