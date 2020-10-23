const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
require("./passport");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

let config;
if (!process.env.IS_LIVE) {
  config = require("./config/keys");
}
const app = express();
app.use(cors());

//MongoDB Setup
const mongodb = process.env.mongodburl || config.mongodburl;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('debug', true); uncomment in order to see queries being made in console

//BodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["dsdsdsifi"],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session({ saveUninitialized: false, resave: false }));

app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "client/build")));

/*React root*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server on port ${port}`));
