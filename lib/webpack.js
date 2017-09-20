/**
 * webpack 入口文件
 * @param options
 * @author caoyi
 */
const fs        = require('fs');
const path      = require('path');
const util      = require('./util');
const buildDeps = require('./buildDeps.js');

//读取 output 的头部分
const templateSingle = fs.readFileSync(path.join(__dirname, 'templateSingle.js'));

/**
 * 替换 require
 * @param module
 */
function writeSource(module) {
    let replaces = [];
    let source   = module.source;
    console.log(module);
    module.requires.forEach(req => {
        replaces.push({
            from        : req.nameRange[0],
            to          : req.nameRange[1],
            value       : `/* ${req.name} */` + req.id,
            requireFrom : req.requireRange[0],
            requireTo   : req.requireRange[1],
            requireValue: '__webpack_require__'
        });
    })

    replaces.forEach(replace => {
        let target        = source.substring(replace.from, replace.to);
        let requireTarget = source.substring(replace.requireFrom, replace.requireTo);

        //将 “require”关键字改变
        source = source.replace(target, replace.value);
        source = source.replace(requireTarget, replace.requireValue);
    });

    module.source = source;//将源中直接变了
    return source;
}

function writeChunk(depTree) {
    const modules = depTree.modules;
    let buffer = [];
    for(let module in modules){
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

module.exports = function (options) {
    ;(async function start() {
        try {
            const depTree  = await  buildDeps(options.input, options.context);
            const outputJS = generateOutputJS(depTree);
            await util.writeFilePromise(options.output,outputJS);
        } catch (err) {
            console.error(err);
        }
    })();
};