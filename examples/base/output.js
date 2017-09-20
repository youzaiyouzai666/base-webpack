/******/(function(modules) {
    /******/	var installedModules = {};
    /******/	function __webpack_require__(moduleId) {
        /******/		if(installedModules[moduleId])
        /******/			return installedModules[moduleId].exports;
        /******/		var module = installedModules[moduleId] = {
            /******/			exports: {}
            /******/		};
        /******/		modules[moduleId](module, module.exports, __webpack_require__);
        /******/		return module.exports;
        /******/	}
    /******/	return __webpack_require__(0);
    /******/})
/************************************************************************//******/({
/******/0: function(module, exports, __webpack_require__) {

let a = __webpack_require__(/* ./a */1);

a();




/******/},
/******/
/******/1: function(module, exports, __webpack_require__) {

// module a
let b = __webpack_require__(/* ./b */2);
module.exports = function () {
    console.log('a');
    b();
};

/******/},
/******/
/******/2: function(module, exports, __webpack_require__) {

// module a

module.exports = function () {
    console.log('b')
};

/******/},
/******/
/******/})