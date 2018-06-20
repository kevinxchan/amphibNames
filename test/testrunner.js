/* eslint-disable indent */
const expect = require("chai").expect;
const parseInputFile = require("../src/parser/fileparser.js");
const queryDB = require("../src/querydb.js");

describe("Input file parsing", function () {
		it("Should parse two line file separated by newline", () => {
				const filepath = "./test/data/frog.double.nl.txt";
				const expectLines = 2;
				let res;

				res = parseInputFile.parseInputFile(filepath);
				expect(res).to.have.length(expectLines);
		});

		it("Should parse large file separated by commas", () => {
				const filepath = "./test/data/frog.full.comma.txt";
				const expectLines = 1988;
				const res = parseInputFile.parseInputFile(filepath);
				expect(res).to.have.length(expectLines);
		});
});

describe("sendQuery suite", function() {
		it("Should return two valid results from sending query", async () => {
				const filepath = "./test/data/frog.double.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = await queryDB.sendQuery(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response["worldNames"]).to.have.length(2);
						expect(response["errorNames"]).to.have.length(0);
						expect(response["worldNames"]).to.deep.equal(["Acanthixalus sonjae", "Afrixalus dorsalis"]);
				}
		});

		it("Should return valid results from small query", async () => {
				const filepath = "./test/data/frog.small.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = await queryDB.sendQuery(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response["worldNames"]).to.have.length(51);
				}
		});

		it("Should return valid results from query with 100 names", async function() {
				const filepath = "./test/data/frog.100.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = await queryDB.sendQuery(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response["worldNames"]).to.have.length(101);
				}
		});

		it("Should return valid results from query with 200 names", async function() {
				this.timeout(30000);
				const filepath = "./test/data/frog.200.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = await queryDB.sendQuery(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response["worldNames"]).to.have.length(201);
				}
		});

		// TODO: consider removing this test due to slow response
		it("Should return valid results from query with 400 names", async function() {
				this.timeout(50000);
				const filepath = "./test/data/frog.400.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = await queryDB.sendQuery(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response["worldNames"]).to.have.length(401);
				}
		});
});

describe("parseAmphibiaWeb suite", function() {
		it("Should return two valid results from parsing names", () => {
				const filepath = "./test/data/frog.double.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(2);
						expect(response).to.deep.equal(["Acanthixalus sonjae", "Afrixalus dorsalis"]);
				}
		});

		it("Should return larger valid results", () => {
				const filepath = "./test/data/frog.small.comma.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(51);
				}
		});

		it("Should return all valid results from file with commas", () => {
				const filepath = "./test/data/frog.full.comma.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(1988);
				}
		});

		it("Should return all valid results from file with newlines", () => {
				const filepath = "./test/data/frog.full.nl.txt";
				const res = parseInputFile.parseInputFile(filepath);
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(res);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(1988);
				}
		});

		it("Should update a known name to new taxonomy", () => {
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(["Nesionixalus thomensis"]);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(1);
						expect(response).to.deep.equal(["Hyperolius thomensis"]);
				}
		});

		it("Should update a known synonomy to new taxonomy", () => {
				let response;

				try {
						response = queryDB.parseAmphibiaWeb(["Leptopelis barbouri"]);
				} catch (err) {
						response = err;
				} finally {
						expect(response).to.have.length(1);
						expect(response).to.deep.equal(["Leptopelis grandiceps"]);
				}
		});
});
