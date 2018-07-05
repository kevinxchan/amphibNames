const express = require("express");
const renderTable = require("../src/public/javascripts/renderTable");
const router = express.Router();
const path = require("path");

/* GET users listing. */
router.get("/", function (req, res, next) {
    const callRenderTable = renderTable.renderTable();
    res.render("query", { title: "amphibNames", renderTable: callRenderTable });
});

router.get("/download", function (req, res, next) {
    const file = path.resolve("src/out/table.txt");
    res.download(file);
});

module.exports = router;
