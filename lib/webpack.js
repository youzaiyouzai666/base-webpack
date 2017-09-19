/**
 * webpack 入口文件
 * @param options
 * @author caoyi
 */
const buildDeps = require('./buildDeps.js');

module.exports = function (options) {
    ;(async function start() {
        try {
            let depTree = await  buildDeps(options.input, options.context);
        } catch (err) {

        }
    })();
};