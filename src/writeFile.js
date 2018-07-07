/* eslint-disable no-mixed-spaces-and-tabs,indent */
const fs = require("fs");
const fileParser = require("./parser/fileparser");
const queryDB = require("./querydb");

/**
 * Reads in the file with query names, queries the two databases, and saves the results to disk in
 * tab-delimited .txt format.
 */
function writeToDisk(file) {
    const outpath = "src/out/";
    const outfile = "table.txt";
    const parsed = fileParser.parseInputFile(file);
		const amphibWebSpecies = queryDB.parseAmphibiaWeb(parsed);
		const writeStream = fs.createWriteStream(outpath + outfile);
		let amphibWorldSpecies = [];
    let errors = [];

    return new Promise(function(resolve, reject) {
				queryDB.sendQuery(parsed).then(function(data) {
						amphibWorldSpecies = data["worldNames"];
						errors = data["errorNames"];

						if (!(fs.existsSync(outpath))) {
								fs.mkdirSync(outpath);
						}

						const header = "query_name" + "\t" +  "amphibia_web" + "\t" + "amphibian_species_of_the_world" + "\n";
						writeStream.write(header);
						for (let i = 0; i < parsed.length; i++) {
								const line = parsed[i] + "\t" + amphibWebSpecies[i] + "\t" + amphibWorldSpecies[i] + "\n";
								writeStream.write(line);
						}
						resolve();
				}).catch(function(err) {
						reject(err);
				});
		});
}

module.exports.writeToDisk = writeToDisk;
