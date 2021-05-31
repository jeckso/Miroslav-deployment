var express = require("express");
var router = express.Router();
const manager = require("../managers/auth");

const db = require("../models");

router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/", (req, res) => {
  return manager.findUser(req.body).then((result) => {
    let status;
    console.log(result + "SOSI BLYA");
    if (result) {
      req.session.token = req.sessionID;
      status = true;
    } else {
      status = false;
    }
    res.send({ status });
  });
});

module.exports = router;
