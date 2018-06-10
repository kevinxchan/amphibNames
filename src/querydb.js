/* eslint-disable no-mixed-spaces-and-tabs,indent */
const rp = require("request-promise");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
/**
 * Query databases with the list of names.
 */
function sendQuery(names) {
    const amphibWeb = "https://amphibiaweb.org/search/index.html";
    const amphibWorld = "http://research.amnh.org/vz/herpetology/amphibia/amphib/basic_search";
    // const reqAllNames = [];

    for (const name of names) {
        const nameEncode = name.replace(/\s/g, "+");
        const options = {
            method: "GET",
            uri: amphibWorld,
            qs: {
                stree: "",
                stree_id: "",
                basic_query: nameEncode,
								resolveWithFullResponse: true
            }
        };
        rp(options).then((data) => {
        		const document = new JSDOM(data).window.document;
						const taxaString = document.getElementsByClassName("url")[0].textContent;
						let name = taxaString.split("/");
						name = name[name.length - 1];
						name = name.replace(/-/, " ");
						console.log(name);
				}).catch((err) => {
						console.log("ERROR " + err);
				});
    }
}

sendQuery(["bufo canorus"]);