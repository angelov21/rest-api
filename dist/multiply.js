'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sum = require('./sum.js');

var _sum2 = _interopRequireDefault(_sum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multiply = function multiply(a, b) {
    var total = 0;
    for (var i = 1; i <= b; i++) {
        total = (0, _sum2.default)(a, total);
    }
    return total;
}; // multiply.js


var testingbranch = 'testing branch new';

exports.default = multiply;