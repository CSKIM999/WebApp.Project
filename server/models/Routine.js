const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema => DB 의 detail
const routineSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxlength: 20,
  },
  detail: {
    type: Array,
    default: [],
  },
});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = { Routine };
