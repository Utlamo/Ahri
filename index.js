import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
//const dirFiles = require('./load_modules/dir.js');
const folderPath = __dirname + "//ahri_modules";
var filejs = [];
var filepy = [];
var filejson = [];

function dirFiles(folder) {
  let filedir = [];
  let file = [];
  fs.readdirSync(folder).forEach( filename => {
    file.push(filename);
    switch (path.extname(filename)) {
      case ".js":
        filejs.push(folder + "//" + filename);
        break;
      case ".py":
        filepy.push(folder + "//" + filename);
        break;
      case ".json":
        filejson.push(folder + "//" + filename);
        break;
      case "":
        filedir.push(folder + "//" + filename);
        break;
      default:
        console.error(chalk.yellow("Plik ") + chalk.red(folder + "//" + filename) + chalk.yellow(" ma nieprawidłowe rozszerzenie i nie został załadowany!"));
    }
  });
  filedir.forEach(subdir => { dirFiles(subdir); });
}

dirFiles(folderPath);
console.log("załadowano pliki js: " + filejs);
console.log("załadowano pliki py: " + filepy);
