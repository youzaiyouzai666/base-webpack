#!/usr/bin/env node

/**
 * @file 主要是参数处理,然后调用具体处理 1.入口文件（命令行中输入）  2.输出文件（如果命令行中没有，则使用默认output.js）  3.loader配置
 * @author caoyi
 * @type {"path"}
 */
const path    = require('path');
const argv    = require('yargs').argv;
const webpack = require('../lib/webpack');
const debug   = require('debug')('./bin/webpack');

//1.入参准备
const options    = {
    input  : '',
    output : '',
    context: '',
    rules  : [
        {
            test: /\.less$/,
            use : [
                'style-loader',
                'less-loader'
            ]
        }
    ]
};
let inParameters = argv._ || [];//[]
if (!inParameters.length) {//无传入参数
    console.error('请传入入口文件');
    return;
}

//2.处理参数
options.input   = handleAttrInput(inParameters);
options.context = path.dirname(options.input);
options.output  = handleAttrOutput(inParameters);
debug('入口参数:', options);

//3.具体调用webpack
webpack(options);


/**
 * 处理参数——指定入口js
 */
function handleAttrInput(inParameters) {
    return path.join(process.cwd(), inParameters[0]);
}

/**
 * 处理参数output
 * @param inParameters
 */
function handleAttrOutput(inParameters) {
    if (inParameters.length === 1) {
        return path.join(options.context, 'output.js');
    } else {
        const output = inParameters[1];
        if (path.isAbsolute(output)) {
            return output;
        } else {
            return path.join(context, output)
        }
    }
}

