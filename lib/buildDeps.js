/**
 * 分析处理模块依赖
 * @param mainModule 入口js
 * @param context  上下文,入口js所在目录
 * @returns {Promise}
 */
const path  = require('path');
const util  = require('./uitl');
const parse = require('./parse');

let mid = 0;



/**
 * 将地址转换为绝对地址
 * @param moduleName
 * @param context
 */
function getAbsoluteFileName(moduleName, context) {
    if(path.extname(moduleName)===''){
        moduleName= moduleName+'.js'
    }
    if(!path.isAbsolute(moduleName)){
        moduleName =path.join(context,moduleName);
    }
    return moduleName;
}

/**
 *
 * @param moduleName 模块名称
 * @param context 上下文,入口js所在目录
 */
function parseModule(depTree,moduleName, context) {

    return (async function _parse() {
        try {
            moduleName = getAbsoluteFileName(moduleName, context);//将模块名称 转换为绝对地址
            //如果模块存在，则直接返回
            if (depTree.modules[moduleName]) {
                return depTree.modules[moduleName];
            }
            const module    = {
                source  : '',
                requires: '',
                fileName: '',
                name    : ''
            };
            let _source     = '',
                  _requires = {};

            module.source   = _source   = (await util.readFile(moduleName)).toString();//得到主模块
            module.requires = _requires = parse(_source);
            module.fileName = moduleName;
            module.name     = moduleName;
            depTree.modules[moduleName] = module;

            if (_requires && _requires.length > 0) {
                for(let i=0;i< _requires.length; i++){
                    let require = _requires[i];
                    depTree = await parseModule(depTree, require.name, context);
                }
            }
            return depTree;
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error('model does not exist:', err);
            } else {
                console.error('error: function parseModule =>', err);
            }
        }
    })();

}


module.exports = function (mainModule, context) {
    let depTree = {
        modules          : {},  // 用于存储各个模块对象
        mapModuleNameToId: {}   // 用于映射模块名到模块id之间的关系
    };
    return (async function () {
        await parseModule(depTree,mainModule, context);
        return depTree;
    })();

};