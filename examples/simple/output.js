/******/(function(modules) {
    /******/	var installedModules = {};
    /******/	function __webpack_require__(moduleId) {
        /******/		if(installedModules[moduleId])
        /******/			return installedModules[moduleId].exports;
        /******/		var module = installedModules[moduleId] = {
            /******/			exports: {},
                                id: moduleId
            /******/		};
        /******/		modules[moduleId].call(module.exports,module, module.exports, __webpack_require__);
        /******/		return module.exports;
        /******/	}
    /******/	return __webpack_require__(0);
    /******/})
/************************************************************************//******/({
/******/0: function(module, exports, __webpack_require__) {

//example.js
let a = __webpack_require__(/* E:\demo2\base-webpack\examples\simple\a.js */1);

a();




/******/},
/******/
/******/1: function(module, exports, __webpack_require__) {

// ========module a
let b = __webpack_require__(/* E:\demo2\base-webpack\examples\simple\b.js */2);
let b2 = __webpack_require__(/* E:\demo2\base-webpack\examples\simple\b2.js */4);
module.exports = function () {
    console.log('a');
    b();
    b2();
};

/******/},
/******/
/******/2: function(module, exports, __webpack_require__) {

// =============module b
let c = __webpack_require__(/* E:\demo2\base-webpack\examples\simple\c.js */3);
module.exports = function () {
    console.log('b');
    c();
};

/******/},
/******/
/******/3: function(module, exports, __webpack_require__) {

// ============module c
module.exports = function () {
    console.log('c');
};

/******/},
/******/
/******/4: function(module, exports, __webpack_require__) {

// ===========module b2
module.exports = function () {
    console.log('b2');
};

/******/},
/******/
/******/})