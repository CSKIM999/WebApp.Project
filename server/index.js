const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

if (process.env.MONGO_URI) {
  const options = {
    ca: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/fullchain.pem`),
    key: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/privkey.pem`),
    cert: fs.readFileSync(`/etc/letsencrypt/live/${DOMAIN_NAME}/cert.pem`),
  };
  https.createServer(options, app).listen(443, () => {
    console.log("443번 포트에서 대기중입니다.");
  });
} else {
  app.listen(port, () => {
    console.log(`DEV MODE ON! App listening on port ${port}!`);
  });
}

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

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
