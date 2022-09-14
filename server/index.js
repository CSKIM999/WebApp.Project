const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", require("./routes/user"));
app.use("/api/routine", require("./routes/routine"));
app.use("/api/history", require("./routes/history"));

mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB CONNECTED..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  return res.send("hello~~ cskim speaking in ubuntu");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
