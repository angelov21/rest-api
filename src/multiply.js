// multiply.js
import sum from './sum.js'

var multiply = function (a, b) {
    var total = 0;
    for (var i = 1; i <= b; i++) {
        total = sum(a, total);
    }
    return total;
};

var testingbranch = 'testing branch new';

export default multiply;