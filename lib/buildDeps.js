/**
 * 分析处理模块依赖
 * @param mainModule 入口js
 * @param context  上下文,入口js所在目录
 * @returns {Promise}
 */
const fs    = require('fs');
const util  = require('./uitl');
const parse = require('./parse');
let mid     = 0;

module.exports = function (mainModule, context) {
    const depTree = {
        modules          : {},            // 用于存储各个模块对象
        mapModuleNameToId: {}   // 用于映射模块名到模块id之间的关系
    };

    async function dep() {
        return await parseModule(depTree, mainModule, context)
    }

    return dep();

};

/**
 *
 * @param depTree 模块依赖关系对象
 * @param mainModule 模块名称
 * @param context 上下文,入口js所在目录
 */
function parseModule(depTree, mainModule, context) {
    ;(async function _parse() {
        try {
            const source      = await util.readFile(mainModule);//得到主模块
            const parseModule = parse(source);

        } catch (err) {
            console.err('模块依赖', err);
        }
    })();

}

function modulePara(){

}