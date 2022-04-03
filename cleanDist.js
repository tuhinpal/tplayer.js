const fs = require("fs");

// list and delete all files in the dist folder
const distFiles = fs.readdirSync("./dist");
distFiles.forEach((file) => {
  if (file !== ".gitkeep") {
    fs.unlinkSync(`./dist/${file}`);
  }
});
