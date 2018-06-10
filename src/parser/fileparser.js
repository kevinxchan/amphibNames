const fs = require("fs");

/**
 * Parses input file in comma separated or newline separated format.
 */
function parseInputFile(file) {
    let lines = fs.readFileSync(file).toString();
    lines = lines.split(/\n|[,]/);
    let ret = [];

    for (const line of lines) {
        ret.push(line);
    }
    for (const foo of ret) {
        console.log(foo);
    }
    return ret;
}

module.exports.parseInputFile = parseInputFile;
