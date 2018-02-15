var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", {
    tagTittle: "API - Nodepop",
    title: "Nodepop",
    description: "Practica fundamentos Nodejs con MongoDB por Daniel Castillo",
    doc: "../doc/index.html"
  });
});

module.exports = router;
