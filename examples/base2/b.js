// =============module b
const a = require  ('./a');
module.exports = function () {
    console.log('b');
    a();
};