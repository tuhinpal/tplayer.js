const fs = require("fs");
const getVersion = require("../package.json").version;

const files = ["../README.md", "../example/html/index.html"];

files.forEach((file) => {
  file = `${__dirname}/${file}`;
  var content = fs.readFileSync(file, "utf8");
  content = content.replace(
    /cdn.jsdelivr.net[/]npm[/]tplayer.js@.*[/]dist[/]index.js/g,
    `cdn.jsdelivr.net/npm/tplayer.js@${getVersion}/dist/index.js`
  );
  fs.writeFileSync(file, content, "utf8");
});
