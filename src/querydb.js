/* eslint-disable no-mixed-spaces-and-tabs,indent */
const rp = require("request-promise");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
/**
 * Query databases with the list of names.
 */
function sendQuery(names) {
    const amphibWorld = "http://research.amnh.org/vz/herpetology/amphibia/amphib/basic_search";
    const allPromises = [];
    const worldNames = [];
    const errorNames = [];

		for (const name of names) {
				const nameEncode = name.replace(/\s/g, "+");
				const options = {
						method: "GET",
						uri: amphibWorld,
						qs: {
								stree: "",
								stree_id: "",
								basic_query: nameEncode,
						},
						resolveWithFullResponse: true
				};
				allPromises.push(rp(options));
		}

		Promise.all(allPromises).catch(function(err) {
				console.log("An error happened: " + err);
				errorNames.push({ error: err });
				return allPromises;
		}).then(function (files) {
				for (const data of files) {
						const document = new JSDOM(data["body"]).window.document;
						const taxaString = document.getElementsByClassName("url")[0].textContent;
						if (taxaString === "undefined") {
								worldNames.push("no result");
						} else {
								let updatedName = taxaString.split("/");
								updatedName = updatedName[updatedName.length - 1];
								updatedName = updatedName.replace(/-/, " ").trim();
								worldNames.push(updatedName);
						}
				}
				return { worldNames, errorNames };
		});
}

function parseAmphibiaWeb(names) {
		const fp = "./src/data/amphib_names.txt";
		const parsed = [];
		const webNames = [];
		const file = fs.readFileSync(fp, "utf8");
		const lines = file.split("\n");
		for (const line of lines) {
				const col = line.split("\t");
				parsed.push({
						genusSpecies: col[3] + " " + col[5],
						gaaName: col[7],
						itisName: col[9]
				});
		}

		for (const name of names) {
				let located = false;
				for (let i = 0; i < parsed.length - 1; i++) {
						if (parsed[i]["gaaName"].toLowerCase() === name || parsed[i]["itisName"].toLowerCase() === name) {
								webNames.push(parsed[i]["genusSpecies"]);
								located = true;
						}
				}
				if (!(located)) {
						webNames.push("no result");
				}
		}
		return webNames;
}

console.log(sendQuery(["bufo canorus"]));
// console.log(parseAmphibiaWeb(["bufo canorus"]));