import chalk from 'chalk';
const {yellow, red, blue, green} = chalk;
import * as dotenv from 'dotenv';
dotenv.config();
//now avalibe in process.env.KEY
import files from './dir.js';

console.log(blue("załadowano pliki:"));
console.log(files);
