// module a
let b = require('./b');
module.exports = function () {
    console.log('a');
    b();
};