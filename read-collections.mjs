import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
    input: fs.createReadStream(process.env.HOME + "/Downloads/collections.txt"),
    crlfDelay: Infinity
});
let splitBy = ["-", "_"];
let groupedCollections = {};
rl.on("line", line => {
    let words = [];
    splitBy.some(s => {
        words = line.split(s);
        return words.length > 1;
    });
    //console.log(words)
    let groupKey = words[0];
    groupedCollections[groupKey] = groupedCollections[groupKey] || { iconClass: '', collections: []};
    groupedCollections[groupKey].collections.push(line);
});
rl.on("close", () => {
    let data = JSON.stringify(groupedCollections);
    console.log(Object.keys(groupedCollections).length)
    fs.writeFileSync("grouped-collections.json", data)
});
