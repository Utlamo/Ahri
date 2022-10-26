import chalk from 'chalk';
const {yellow, red, blue} = chalk;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
//const dirFiles = require('./load_modules/dir.js');
const folderPath = __dirname + "//ahri_modules";
var files = []
var allowedFormats = [".py",".js"]

function dirFiles(folder) {
  let filedir = [];
  let file = [];
  fs.readdirSync(folder).forEach( filename => {
    if(path.extname(filename) == ""){
      filedir.push(folder + "//" + filename);
    } else if(allowedFormats.includes(path.extname(filename))){
    let object = {};
    object.src = folder + "//" + filename;
    object.fullname = filename;
    object.name = filename.substring(0, (filename.length - path.extname(filename).length));
    object.ext = path.extname(filename);
    console.log(object.src);
    if(fs.existsSync(folder + "//" + object.name + ".json")){
      let rawdata = fs.readFileSync(folder + "//" + object.name + ".json");
      try {
        object.json = JSON.parse(rawdata);
      } catch (e) {
        console.log(red(e.stack.split("\n", 1).join("")));
        console.log(yellow("Plik json dla ") + red(object.src) + yellow(" Jest błędny!"));
        object.json = loadDefoultjson();
      }
    } else {
      console.log(yellow("plik json nie istnieje"));
      object.json = loadDefoultjson();
    }
    files.push(object);
  } else if(path.extname(filename) != ".json"){
    console.log(yellow("Plik ") + red(folder + "//" + filename) + yellow(" ma nieprawidłowy format i nie został załadowany!"));
  };
  });
  filedir.forEach(subdir => { dirFiles(subdir); });
}

function loadDefoultjson(){
  console.log("w funcji loadDefoultjson() będzie ładowanie domyślnych wartości i return");
  return {};
}
dirFiles(folderPath);
console.log(blue("załadowano pliki:"));
console.log(files);
