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
		form.multiples = false;

		if (!(fs.existsSync(uploadPath))) {
				fs.mkdirSync(uploadPath);
		}

		form.uploadDir = uploadPath;
		form.on("file", function(field, file) {
				fs.renameSync(file.path, path.join(form.uploadDir, file.name));
		});
		form.on("error", function(err) {
				console.log("ERROR: " + err);
				res.status(400).send(err);
		});
		form.on("end", function() {
				console.log("file successfully uploaded");
				res.status(200).send("success");
		});
		form.parse(req);
});

module.exports = router;
