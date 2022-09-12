require("dotenv").config();

if (process.env.MONGO_URI) {
  console.log("here i come", process.env.MONGO_URI);
  // module.exports = require("./prod");
  module.exports = require("./prod");
} else {
  console.log(process.env);
  module.exports = require("./dev");
}
