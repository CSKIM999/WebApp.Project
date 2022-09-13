require("dotenv").config();

if (process.env.MONGO_URI) {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
