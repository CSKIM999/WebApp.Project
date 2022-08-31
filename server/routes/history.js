const express = require("express");
const router = express.Router();

const { History } = require("../models/History");

const handleDate = (date) => {
  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const res = {
    year: yyyy,
    month: mm,
    day: dd,
  };
  return res;
};

router.post("/", (req, res) => {
  const history = new History(req.body);
  history.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/mydocs", (req, res) => {
  History.find({ writer: req.body.writer }).exec((err, myDocs) => {
    if (err) return res.status(400).json({ success: false, err });
    if (myDocs.length > 0) {
      const myRecs = [];
      myDocs.map((item, index) => {
        const date = new Date(item.date);
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        ///////////
        const body = {
          _id: item._id,
          year: yyyy,
          month: mm,
          day: dd,
          name: item.name,
          runtime: item.runtime,
          execute: item.execute,
        };

        myRecs.push(body);
      });
      return res.status(200).json({ success: true, myRecs });
    }
  });
});

router.post("/modify", (req, res) => {
  History.findOneAndUpdate({ _id: req.body._id }, req.body, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

router.post("/remove", (req, res) => {
  History.findByIdAndRemove(req.body._id, (err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

module.exports = router;
