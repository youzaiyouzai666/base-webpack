// ========module a
let b = require  ('./b');
const c = require('./c');
module.exports = function () {
    console.log('a');
    b();
    c();
};