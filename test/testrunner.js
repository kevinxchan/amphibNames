/* eslint-disable indent */
const expect = require("chai").expect;
const parseInputFile = require("../src/parser/fileparser.js");

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