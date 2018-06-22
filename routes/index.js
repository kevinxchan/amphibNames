/* eslint-disable indent */
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { title: "amphibNames" });
    // res.render("form", { title: "amphibNames" });
});

router.post("/", (req, res) => {
		res.render("form", { title: "post" });
});

module.exports = router;
