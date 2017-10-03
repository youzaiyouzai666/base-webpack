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

const test = __webpack_require__(/* E:\demo2\base-webpack\examples\loader\style.less */1);


/******/},
/******/
/******/1: function(module, exports, __webpack_require__) {

__webpack_require__(/* E:\demo2\base-webpack\node_modules\style-loader-fake\addStyle.js */2)(__webpack_require__(/* !E:\demo2\base-webpack\node_modules\less-loader-fake\index.js!E:\demo2\base-webpack\examples\loader\style.less */3))

/******/},
/******/
/******/2: function(module, exports, __webpack_require__) {

/**
 * @author  youngwind
 */

module.exports = function (cssCode) {
    let styleElement = document.createElement("style");
    styleElement.type = "text/css";
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }
    document.getElementsByTagName("head")[0].appendChild(styleElement);
};

/******/},
/******/
/******/3: function(module, exports, __webpack_require__) {

module.exports = ".content {\n  width: 50px;\n  height: 50px;\n  background-color: #000fff;\n}\n"

/******/},
/******/
/******/})