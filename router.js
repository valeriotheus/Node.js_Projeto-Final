const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("base", { title: "Home", view: "index" });
});

router.get("/", (req, res) => {
  res.render("cadastros/show", { cadastros: req.cadastros });
});


module.exports = router;
