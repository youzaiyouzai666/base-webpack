#!/usr/bin/env node

const path    = require('path');
const argv    = require('yargs').argv;
const webpack = require('../lib/webpack');

//入参处理
const options    = {
    input  : '',
    output : '',
    context: ''
};
let inParameters = argv._ || [];//[]
if (!inParameters.length) {//无传入参数
    return;
}

//处理第一个参数——指定入口js
options.input = path.join(process.cwd(), inParameters[0]);

//处理第二个参数——默认为output.js
options.context = path.dirname(options.input);
if (inParameters.length === 1) {
    options.output = path.join(options.context, 'output.js');
} else {
    const output = inParameters[1];
    if (path.isAbsolute(output)) {
        options.output = output;
    } else {
        options.output = path.join(context, output)
    }
}

webpack(options);