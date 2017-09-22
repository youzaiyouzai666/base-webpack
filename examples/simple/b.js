// =============module b
let c = require('./c');
module.exports = function () {
    console.log('b');
    c();
};