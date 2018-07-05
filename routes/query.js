const express = require("express");
const renderTable = require("../src/public/javascripts/renderTable").renderTable();
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.render("query", { title: "amphibNames", renderTable: renderTable });
});

module.exports = router;
