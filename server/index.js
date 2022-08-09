const express = require("express");
const app = express();
const port = 3000;
const config = require("./config/key");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB CONNECTED..."))
  .catch((err) => console.log(err));
