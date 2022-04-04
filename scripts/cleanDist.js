const fs = require("fs");

// list and delete all files in the dist folder
const distFiles = fs.readdirSync(`${__dirname}/../dist`);
distFiles.forEach((file) => {
  if (file !== ".gitkeep") {
    fs.unlinkSync(`${__dirname}/../dist/${file}`);
  }
});
