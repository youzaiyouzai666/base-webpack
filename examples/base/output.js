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
let a = __webpack_require__(/* E:\demo2\base-webpack\examples\base\a.js */1);

a();




/******/},
/******/
/******/1: function(module, exports, __webpack_require__) {

// ========module a
let b = __webpack_require__(/* E:\demo2\base-webpack\examples\base\b.js */2);
const c = __webpack_require__(/* E:\demo2\base-webpack\examples\base\node-modules\c.js */3);
module.exports = function () {
    console.log('a');
    b();
    c();
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
/******/3: function(module, exports, __webpack_require__) {

module.exports = function () {
    console.log('c');
};

/******/},
/******/
/******/})