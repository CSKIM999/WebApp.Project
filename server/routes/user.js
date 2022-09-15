const express = require("express");
const router = express.Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "ID ERROR",
      });
    }

    user.comparePassword(req.body.password, (err, Match) => {
      if (!Match) {
        return res.json({
          loginSuccess: false,
          message: "PASSWORD ERROR",
        });
      }

      user.genToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token, { sameSite: "none", secure: true })
          .status(200)
          .json({ loginSuccess: true, userId: user._id, token: user.token });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    nickname: req.user.nickname,
    role: req.user.role,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.status(400).json({ seccess: false, err, req });
    return res.status(200).send({
      success: true,
    });
  });
});

module.exports = router;
