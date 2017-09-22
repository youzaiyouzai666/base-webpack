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
let a = __webpack_require__(/* E:\demo2\base-webpack\examples\base3\a.js */1);
let b = __webpack_require__(/* E:\demo2\base-webpack\examples\base3\b.js */2);

a();
b();




/******/},
/******/
/******/1: function(module, exports, __webpack_require__) {

// ========module a
let b = __webpack_require__(/* E:\demo2\base-webpack\examples\base3\b.js */2);
module.exports = function () {
    console.log('a');
    b();
};

/******/},
/******/
/******/2: function(module, exports, __webpack_require__) {

// =============module b
module.exports = function () {
    console.log('b');
};

/******/},
/******/
/******/})