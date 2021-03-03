<<<<<<< HEAD
const express = require("express");
const router = express.Router();
=======
var express = require("express");
var router = express.Router();
>>>>>>> 32c4567 ([Add] Promise)

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
