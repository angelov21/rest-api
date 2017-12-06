"use strict";

var _multiply = require("./multiply.js");

var multiply = _interopRequireWildcard(_multiply);

var _sum = require("./sum.js");

var sum = _interopRequireWildcard(_sum);

var _division = require("./division.js");

var _division2 = _interopRequireDefault(_division);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var totalMultiply = multiply.default(5, 3); // index.js - our application logic

var totalSum = sum.default(5, 3);
var division = (0, _division2.default)(10, 5);

console.log('Product of 5 and 3 = ' + totalMultiply);
console.log('Sum of 5 and 3  = ' + totalSum);
console.log('Result = ' + division);

document.write("<h1> " + division + " </h1>");