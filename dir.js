import chalk from 'chalk';
const {yellow, red, blue, green} = chalk;
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();
const folderPath = __dirname + process.env.PATHTO_AHRIMODULES || "//ahri_modules";
const defaultJSON = process.env.DEFAULT_JSON || {"category":"unknown", "limit_time":3000};
const allowedFormats = process.env.ALLOWED_FORMATS || [".py",".js"]
var files = []

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
        if(typeof object.json.limit_time !== 'number'){
          object.json.limit_time = defaultJSON.limit_time;
          console.log(yellow("Załadowano domyślne wartości. Wartość limit_time dla ") + red(object.src) + yellow(" nie jest prawidłową liczbą!"));
        }
        if(typeof object.json.category !== 'string'){
          object.json.category = defaultJSON.category;
          console.log(yellow("Załadowano domyślne wartości. Wartość category dla ") + red(object.src) + yellow(" nie jest tekstem!"));
        }
      } catch (e) {
        console.log(red(e.stack.split("\n", 1).join("")));
        console.log(yellow("Załadowano domyślne wartości. Plik json dla ") + red(object.src) + yellow(" Jest błędny!"));
        object.json = defaultJSON;
      }
    } else {
      console.log(yellow("Załadowano domyślne wartości. Plik json nie istnieje!"));
      object.json = defaultJSON;
    }
    files.push(object);
  } else if(path.extname(filename) != ".json"){
    console.log(yellow("Plik ") + red(folder + "//" + filename) + yellow(" ma nieprawidłowy format i nie został załadowany!"));
  };
  });
  filedir.forEach(subdir => { dirFiles(subdir); });
}
console.log(blue("Ładowanie modułów..."));
dirFiles(folderPath);
console.log(green("Załadowano!"));

export default files;
