/**
 * webpack 入口文件
 * @param options
 * @author caoyi
 */

const path             = require('path');
const util             = require('./util');
const buildDeps        = require('./buildDeps');
const generateOutputJS = require('./generateOutputJS');

module.exports = async function (options) {
    try {
        const depTree = await  buildDeps(options.input, options.context, options.rules);//解析模块 生成depTree {{modules: {}, mapModuleNameToId: {}}}
        util.writeFilePromise(path.join(options.context, 'depTree.json'), JSON.stringify(depTree));//生成中间调试 文件
        const outputJS = generateOutputJS(depTree);//通过depTree 生成js
        await util.writeFilePromise(options.output, outputJS); //将outputJS写入文件
        console.log(`base-webpack 打包生成 =====> ${options.output}文件成功`);
    } catch (err) {
        console.error(`生成${options.output}失败：\r\n`, err);
    }
};