const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema => DB 의 detail
const routineSchema = Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  date: {
    type: String,
    required: true,
    maxlength: 20,
  },
  routine: {
    type: Schema.Types.Array,
    require: true,
    ref: "Routines",
  },
  execute: {
    type: Array,
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", routineSchema);

module.exports = { User };
