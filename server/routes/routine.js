const express = require("express");
const router = express.Router();

const { Routine } = require("../models/Routine");
const { auth } = require("../middleware/auth");

router.post("/", (req, res) => {
  const routine = new Routine(req.body);
  routine.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/routines", (req, res) => {
  Routine.find()
    .populate("writer")
    .exec((err, info) => {
      return res.status(200).json({ success: true, info });
    });
});

module.exports = router;
