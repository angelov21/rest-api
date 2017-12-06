// index.js - our application logic
import * as multiply from "./multiply.js";
import * as sum from "./sum.js";

var totalMultiply = multiply(5, 3);
var totalSum = sum(5, 3);

console.log('Product of 5 and 3 = ' + totalMultiply);
console.log('Sum of 5 and 3  = ' + totalSum);