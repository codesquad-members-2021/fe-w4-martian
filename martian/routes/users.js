<<<<<<< HEAD
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
=======
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
>>>>>>> d296fcf ([Create] js code of Martian-project)
});

module.exports = router;
