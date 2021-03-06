/* eslint-disable indent */
const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const writeFile = require("../src/writeFile");
const downloadTaxonomy = require("../src/public/javascripts/downloadTaxonomy");

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

router.post("/query", (req, res, next) => {
		const uploadPath = path.join(__dirname, "uploads");
		if (fs.existsSync(uploadPath)) {
				const uploadDir = fs.readdirSync(uploadPath);
				if (uploadDir.length === 0) {
						res.redirect("/");
						res.end();
				} else {
						fs.readdirSync(uploadPath).forEach((file) => {
								writeFile.writeToDisk(path.join(uploadPath, file)).then(function() {
										res.redirect("query");
										fs.unlinkSync(path.join(uploadPath, file));
										res.status(200).end();
								}).catch(function(err) {
										res.status(400);
										fs.unlinkSync(path.join(uploadPath, file));
										res.render("uploaderror", { error: err });
								});
						});
				}
		}
});

router.get("/taxa", (req, res) => {
		downloadTaxonomy.downloadTaxonomy().then(function() {
				res.status(200).jsonp({ success: true });
				res.end();
		}).catch(function(err) {
				res.render("error", { error: err });
		});
});


module.exports = router;
