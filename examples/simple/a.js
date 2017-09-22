// ========module a
let b = require  ('./b');
let b2 = require('./b2');
module.exports = function () {
    console.log('a');
    b();
    b2();
};