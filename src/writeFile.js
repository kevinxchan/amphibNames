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

    queryDB.sendQuery(parsed).then(function(resolve) {
    		amphibWorldSpecies = resolve["worldNames"];
    		errors = resolve["errorNames"];

				if (!(fs.existsSync(outpath))) {
						fs.mkdirSync(outpath);
				}

				const header = "query_name" + "\t" +  "amphibia_web" + "\t" + "amphibian_species_of_the_world" + "\t" + "errors" + "\t" + "\n";
				writeStream.write(header);
				for (let i = 0; i < parsed.length; i++) {
						const line = parsed[i] + "\t" + amphibWebSpecies[i] + "\t" + amphibWorldSpecies[i] + "\t" + errors[i] + "\n";
						writeStream.write(line);
				}

		});
}

module.exports.writeToDisk = writeToDisk;
writeToDisk("test/data/frog.double.nl.txt");