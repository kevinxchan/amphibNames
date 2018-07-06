const path = require("path");
const fs = require("fs");
const exec = require("child_process").exec;

function downloadTaxonomy() {
    const downloadPath = path.resolve("src/data");
    const taxaPath = "https://amphibiaweb.org/amphib_names.txt";
    const fileName = path.basename(taxaPath);
    const wget = "wget -P " + downloadPath + " " + taxaPath;

    if (fs.existsSync()) {
        fs.unlinkSync(path.join(downloadPath, "amphib_names.txt"));
    }
    const child = exec(wget, function(err, stdout, stderr) {
        if (err) {
            throw err;
        }
        console.log(fileName + " downloaded to " + downloadPath);
    });
}

module.exports.downloadTaxonomy = downloadTaxonomy;