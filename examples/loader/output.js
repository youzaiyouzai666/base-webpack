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

require('./style.less');


/******/},
/******/
/******/})