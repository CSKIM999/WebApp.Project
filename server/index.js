const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://cskim999.github.io", "http://localhost:3000"],
    credentials: true,
  })
);

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

if (process.env.MONGO_URI) {
  const options = {
    ca: fs.readFileSync(
      `/etc/letsencrypt/live/the-nest-of-cskim.kro.kr/fullchain.pem`
    ),
    key: fs.readFileSync(
      `/etc/letsencrypt/live/the-nest-of-cskim.kro.kr/privkey.pem`
    ),
    cert: fs.readFileSync(
      `/etc/letsencrypt/live/the-nest-of-cskim.kro.kr/cert.pem`
    ),
  };
  https.createServer(options, app).listen(port, () => {
    console.log("PROD MODE ON! App listening on port 5000.");
  });
} else {
  app.listen(port, () => {
    console.log(`DEV MODE ON! App listening on port ${port}!`);
  });
}
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
