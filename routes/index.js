/* eslint-disable indent */
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { title: "amphibNames" });
});

router.post("/upload", (req, res) => {
		const uploadPath = path.join(__dirname + "/uploads");
		const form = formidable.IncomingForm();
		form.multiples = true;

		if (!(fs.existsSync(uploadPath))) {
				fs.mkdirSync(uploadPath);
		}

		form.uploadDir = uploadPath;
		form.on("upload", function(field, file) {
				fs.rename(file.path, path.join(form.uploadDir, file.name));
		});
		form.on("error", function(err) {
				console.log("error " + err);
		});
		form.on("end", function() {
				res.send("success");
		});
		form.parse(req);
});

module.exports = router;
