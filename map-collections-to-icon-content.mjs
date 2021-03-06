import fs from "fs";
import readline from "readline";

let grouped_collections = JSON.parse(fs.readFileSync("grouped-collections_.json"))
    //console.log(Object.keys(grouped_collections).some(c => {console.log(c); return c == "cat"}));
const iconContentsRL = readline.createInterface({
    input: fs.createReadStream("icon-contents.txt"),
    crlfDelay: Infinity
});

//let writeStream = fs.createWriteStream("CollectionsUnicodeClassList.txt");
let sassList = "//collections\n";
let regGetCollectionName = new RegExp(`"(.*)":`);
let regGetUnicode = new RegExp(`: "(.*)"`);
iconContentsRL.on("line", line => {
    let collection = regGetCollectionName.exec(line)[1];
    let unicode = regGetUnicode.exec(line)[1];
    if (!grouped_collections[collection]) {
        console.log(collection, "not exist");
        return;
    }
    let classes = grouped_collections[collection].collections.reduce((acc, v) => {
        if (acc) acc += ", ";
        acc += `"${v}"`;
        return acc;
    }, "");
    //console.log(classes)
    sassList += `
            ${collection}: (content: unicode(${unicode}), classes:(${classes})),`;
});
iconContentsRL.on("close", () => {
    fs.writeFile("collections-scss-list.txt", sassList, function(err) {
        if (err) return console.log(err);
        console.log('collections-scss-list.txt');
    });
});