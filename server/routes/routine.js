const express = require("express");
const router = express.Router();

const { Routine } = require("../models/Routine");

router.post("/", (req, res) => {
  const routine = new Routine(req.body);
  routine.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/routines", (req, res) => {
  Routine.find({ writer: req.body.writer }).exec((err, info) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, info });
  });
});

router.post("/modify", (req, res) => {
  Routine.findOneAndUpdate({ _id: req.body._id }, req.body, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post("/remove", (req, res) => {
  Routine.findByIdAndRemove(req.body._id, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

module.exports = router;
