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
								worldNames.push({ update: "no result" });
						} else {
								let updatedName = taxaString.split("/");
								updatedName = updatedName[updatedName.length - 1];
								updatedName = updatedName.replace(/-/, " ").trim();
								worldNames.push({ update: updatedName });
						}
				}
				return { worldNames, errorNames };
		});
}

function parseAmphibiaWeb() {
		const fp = "./src/data/amphib_names.txt";
		fs.readFile(fp, "utf8", (err, data) => {
				if (err) {
						throw err;
				} else {
						console.log(data);
				}
		});
}

sendQuery(["bufo canorus"]);
// parseAmphibiaWeb();