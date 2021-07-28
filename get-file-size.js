const fs = require('fs'); // 
const folder = __dirname + "/file-size";

// fs.readdirSync(folder).forEach(file => {
//   console.log(file);
// });
fs.readdir(folder, (err, files) => {
    files.forEach(file => {
        console.log(`${file} ` + getFilesizeInBytes(`${folder}/${file}`) + " bytes");
    });
});

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}