// index.js - our application logic
import * as multiply from "./multiply.js";
import * as sum from "./sum.js";
import divide from './division.js';

var totalMultiply = multiply.default(5, 3);
var totalSum = sum.default(5, 3);
var division = divide(10,5);

console.log('Product of 5 and 3 = ' + totalMultiply);
console.log('Sum of 5 and 3  = ' + totalSum);
console.log('Result = ' + division);

document.write(`<h1> ${division} </h1>`);