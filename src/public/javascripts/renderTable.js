const fs = require("fs");


function checkExistence() {
    const path = "./src/out/table.txt";
    return fs.existsSync(path);
}

function renderTable() {
    const path = "./src/out/table.txt";
    const ret = {};
    const queryNames = [];
    const amphibWebNames = [];
    const worldNames = [];
    const errors = [];
    if (checkExistence()) {
        const file = fs.readFileSync(path, "utf8");
        const lines = file.split("\n");
        for (const line of lines) {
            const delimited = line.split("\t");
            queryNames.push(delimited[0]);
            amphibWebNames.push(delimited[1]);
            worldNames.push(delimited[2]);
            errors.push(delimited[3]);
        }
    }
    ret["queryNames"] = queryNames;
    ret["amphibWebNames"] = amphibWebNames;
    ret["worldNames"] = worldNames;
    ret["errors"] = errors;
    return ret;
}

module.exports.renderTable = renderTable;