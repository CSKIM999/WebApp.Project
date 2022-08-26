const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema => DB 의 detail
const historySchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    runtime: {
      type: Array,
      required: true,
    },
    execute: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = { History };
