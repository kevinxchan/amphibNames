/* eslint-disable no-mixed-spaces-and-tabs,indent */
const Promise = require("bluebird");
const rp = require("request-promise");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
/**
 * Query databases with the list of names.
 */
function sendQuery(names) {
		return new Promise(function(resolve, reject) {
				const amphibWorld = "http://research.amnh.org/vz/herpetology/amphibia/amphib/basic_search";
				const allPromises = [];
				const worldNames = [];
				const errorNames = [];

				Promise.map(names, function(name) {
						const options = {
								method: "GET",
								uri: amphibWorld,
								qs: {
										stree: "",
										stree_id: "",
										basic_query: name,
								},
								resolveWithFullResponse: true
						};
						return rp(options);
				}).then(function (files) {
						for (const data of files) {
								const document = new JSDOM(data["body"]).window.document;
								let taxaString = document.getElementsByClassName("url")[0];
								if (taxaString === undefined) {
										worldNames.push("no result");
								} else {
										taxaString = taxaString.textContent;
										let updatedName = taxaString.split("/");
										updatedName = updatedName[updatedName.length - 1];
										updatedName = updatedName.replace(/-/, " ").trim();
										worldNames.push(updatedName);
										errorNames.push("");
								}
						}
						resolve({ worldNames, errorNames });
				}).catch(function(err) {
						console.log("An error happened: " + err);
						reject(err);
				});
		});
}

function parseAmphibiaWeb(names) {
		const fp = "src/data/amphib_names.txt";
		const parsed = [];
		const webNames = [];

		if (!(fs.existsSync(fp))) {
				console.log("Amphibia Web file not found! Skipping...");
				return webNames.fill("no result", 0, names.length - 1);
		} else {
				const file = fs.readFileSync(fp, "utf8");
				const lines = file.split("\n");
				for (const line of lines) {
						const col = line.split("\t");
						parsed.push({
								genusSpecies: col[3] + " " + col[5],
								gaaName: col[7],
								synonymies: col[8],
								itisName: col[9]
						});
				}

				for (let name of names) {
						name = name.toLowerCase();
						for (let i = 0; i < parsed.length - 1; i++) {
								if (parsed[i]["gaaName"].toLowerCase() === name
										|| parsed[i]["itisName"].toLowerCase() === name
										|| parsed[i]["synonymies"].toLowerCase() === name) {
										webNames.push(parsed[i]["genusSpecies"]);
										break;
								} else if (i === parsed.length - 2) {
										webNames.push("no result");
								}
						}
				}
				return webNames;
		}
}

module.exports.sendQuery = sendQuery;
module.exports.parseAmphibiaWeb = parseAmphibiaWeb;
