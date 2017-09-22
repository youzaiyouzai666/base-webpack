const fs        = require('fs');
const path      = require('path');

//读取 output 的头部分
const templateSingle = fs.readFileSync(path.join(__dirname, 'templateSingle.js'));

/**
 * 替换 require
 * @param module
 */
function writeSource(module) {
    let replaces = [];
    let source   = module.source;
    module.requires.forEach(req => {
        replaces.push({
            from       : req.nameRange[0],
            to         : req.nameRange[1],
            value      : `__webpack_require__(/* ${req.name} */` + req.id,//将 “require”关键字改变
            requireFrom: req.requireRange[0],
            requireTo  : req.requireRange[1],
        });
    });

    // 排序,从后往前地替换模块名,这样才能保证正确替换所有的模块--使用索引来进行替换，所以需要从后往前
    replaces.sort((a, b) => {
        return b.from - a.from;
    });

    replaces.forEach(replace => {
        let target = source.substring(replace.requireFrom, replace.to);
        source     = source.replace(target, replace.value);
    });

    module.source = source;//将源中直接变了
    return source;
}

function writeChunk(depTree) {
    const modules = depTree.modules;
    let buffer    = [];
    for (let module in modules) {
        module = modules[module];
        buffer.push('/******/');
        buffer.push(module.id);
        buffer.push(': function(module, exports, __webpack_require__) {\n\n');

        // 调用此方法,拼接每一个具体的模块的内部内容
        buffer.push(writeSource(module));

        buffer.push('\n\n/******/},\n/******/\n');
    }
    return buffer.join('');
}

/**
 * 生成目标js
 * @param depTree
 */
function generateOutputJS(depTree) {
    let buffer = [];
    buffer.push(templateSingle);
    buffer.push('/******/({\n');
    //模块开始
    buffer.push(writeChunk(depTree));

    buffer.push('/******/})');
    buffer = buffer.join('');
    return buffer;
}
module.exports = generateOutputJS;