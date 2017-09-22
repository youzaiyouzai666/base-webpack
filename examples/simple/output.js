/******/(function(modules) {
/******/	var installedModules = {};
/******/	function require(moduleId) {
/******/		if(installedModules[moduleId])
/******/			return installedModules[moduleId].exports;
/******/		var module = installedModules[moduleId] = {
/******/			exports: {}
/******/		};
/******/		modules[moduleId](module, module.exports, require);
/******/		return module.exports;
/******/	}
/******/	return require(0);
/******/})
/******/({
/******/0: function(module, exports, require) {

//example.js
let a = require(/* ./a */1);

a();




/******/},
/******/
/******/1: function(module, exports, require) {

// ========module a
let b = require  (/* ./b */2);
let b2 = require(/* ./b2 */4);
module.exports = function () {
    console.log('a');
    b();
    b2();
};

/******/},
/******/
/******/2: function(module, exports, require) {

// =============module b
let c = require(/* ./c */3);
module.exports = function () {
    console.log('b');
    c();
};

/******/},
/******/
/******/3: function(module, exports, require) {

// ============module c
module.exports = function () {
    console.log('c');
};

/******/},
/******/
/******/4: function(module, exports, require) {

// ===========module b2
module.exports = function () {
    console.log('b2');
};

/******/},
/******/
/******/})