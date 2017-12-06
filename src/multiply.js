// multiply.js
var sum = require('./sum');

var multiply = function (a, b) {
    var total = 0;
    for (var i = 1; i < b; i++) {
        total = sum(a, total);
    }
    return total;
};
export default multiply;