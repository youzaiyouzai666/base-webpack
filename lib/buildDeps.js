const util  = require('./util');
const parse = require('./parse');

let mid = 0;

/**
 *
 * @type {{modules: {}, mapModuleNameToId: {}}}
 */
let depTree = {
    modules          : {},  // 用于存储各个模块对象
    mapModuleNameToId: {}   // 用于映射模块名到模块id之间的关系
};

/**
 * 将模块中的requires 解析到模块到 depTree
 * @param requires
 * @param context
 * @returns {Promise.<void>}
 */
async function dealRequires(requires, context) {
    if (requires && requires.length > 0) {
        for (let i = 0; i < requires.length; i++) {
            let req  = requires[i];
            req.name = await util.getAbsoluteFileName(req.name, context);//将模块名称 转换为绝对地址
            req.id   = depTree.modules[req.name] ? depTree.modules[req.name].id : mid; //if是新模块则，id+1；else 则得到老模块的id
            await parseModule(req.name, context);
        }
    }
}


/**
 * 读取模块，并将模块信息 存入depTree中
 * 递归 深度优先
 * @param moduleName 模块名称
 * @param context 上下文,入口js所在目录
 * @param rules
 */
async function parseModule(moduleName, context, rules) {
    moduleName = await util.getAbsoluteFileName(moduleName, context);//将模块名称 转换为绝对地址
    //如果模块存在，则直接返回 || 递归退出条件
    if (depTree.modules[moduleName]) {
        return depTree.modules[moduleName];
    }
    const module    = {
        id      : -1,
        source  : '',
        requires: '',
        fileName: '',
        name    : ''
    };
    let _source     = '',
          _requires = {};

    module.source = _source = (await util.readFile(moduleName)).toString();//得到模块文件
    module.id       = mid++;//当前取mid，但mid本身+1 以备后用
    module.requires = _requires = parse(_source);
    console.log(_requires);
    module.fileName = moduleName;
    module.name     = moduleName;

    depTree.modules[moduleName]           = module;   //写入模块对象
    depTree.mapModuleNameToId[moduleName] = module.id;//写入映射关系

    //递归 模块中的 require
    await dealRequires(_requires, context);
}

/**
 * 分析处理模块依赖
 * @param mainModule 入口js
 * @param context  上下文,入口js所在目录
 * @param rules  loader 规则
 * @returns depTree {{modules: {}, mapModuleNameToId: {}}}
 */
module.exports = async function (mainModule, context, rules) {
    await parseModule(mainModule, context,rules);
    return depTree;
};