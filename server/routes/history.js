const express = require("express");
const router = express.Router();

const { History } = require("../models/History");
const { auth } = require("../middleware/auth");

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

// /////////////////////////////////////////////////////////////////

router.post("/mydocs", (req, res) => {
  History.find({ writer: req.body.writer }).exec((err, myDocs) => {
    if (err) return res.status(400).json({ success: false, err });
    if (myDocs.length > 0) {
      const myRecs = [];
      myDocs.map((item, index) => {
        // response.payload.map((item, index) => {
        // const date = handleDate(new Date(item.createdAt));

        /////////
        const date = new Date(item.createdAt);
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        ///////////
        const body = {
          year: yyyy,
          month: mm,
          day: dd,
          runtime: item.runtime,
          execute: item.execute,
        };

        myRecs.push(body);
        ////////////////

        // const yearData = myRecs.find((e) => e.year === date.year);
        // if (yearData === undefined) {
        //   myRecs.push({
        //     year: date.year,
        //     monthData: [
        //       {
        //         month: date.month,
        //         dayData: [{ day: date.day, detail: [body] }],
        //       },
        //     ],
        //   });
        // } else {
        //   const monthData = yearData.monthData.find(
        //     (e) => e.month === date.month
        //   );
        //   if (monthData === undefined) {
        //     yearData.push({
        //       month: date.month,
        //       dayData: [{ day: date.day, detail: [body] }],
        //     });
        //   } else {
        //     const dayData = monthData.dayData.find((e) => e.day === date.day);
        //     if (dayData === undefined) {
        //       monthData.dayData.push({ day: date.day, detail: [body] });
        //     } else {
        //       dayData.detail.push(body);
        //     }
        //   }
        // }
        // });

        /////////////
      });
      return res.status(200).json({ success: true, myRecs });
    }
  });
});

// router.post("/modify", (req, res) => {
//   Routine.findOneAndUpdate({ _id: req.body._id }, req.body, (err) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });

// router.post("/remove", (req, res) => {
//   Routine.findByIdAndRemove(req.body._id, (err) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).send({ success: true });
//   });
// });

module.exports = router;
