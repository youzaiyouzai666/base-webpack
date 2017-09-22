// ========module a
const b = require  ('./b');
module.exports = function () {
    console.log('a');
    b();
};