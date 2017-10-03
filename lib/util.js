const fs = require('fs');
const path  = require('path');
const debug   = require('debug')('util');

//将 fs promise化
function readFile(fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}

function writeFile(fileName, output) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, output, 'utf-8', function (error, data) {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
}

/**
 * 判断路径文件是否存在
 * @param {string} path 目标文件路径
 * @returns {Promise}
 */
function statPromise(path) {
    return new Promise(resolve => {
        fs.stat(path, function (err, stats) {
            if (stats && stats.isFile) {
                resolve(path);
                return;
            }
            resolve(false);
        });
    })
}

/**
 * 逐级查询 moduleName
 * @param moduleName
 * @param paths
 * @returns {Promise.<*>}
 * @private
 */
async  function _traversalPaths(moduleName,paths){

    for(let i=paths.length; i>1; i--){
        let pathDir = paths.slice(0,i).join(path.sep);
        let absolutePath =await statPromise(path.join(pathDir,moduleName));
        if(!absolutePath){
            absolutePath =await statPromise(path.join(pathDir,'./node_modules',moduleName));
        }
        if(!absolutePath){
            absolutePath =await statPromise(path.join(pathDir,'./node_modules',moduleName.slice(0,-3),'./index.js'));
        }
        if(absolutePath){
            return absolutePath
        }
    }
}

/**
 * 相对地址 转换为绝对地址
 * 逐级向上寻址，同级目录|./node-modules目录
 * @param moduleName
 * @param{string} context
 * @returns {string}
 * @todo 有点乱 需要重构
 */
async function _addTransformRelativeToAbsolute(moduleName, context) {

    const paths = context.split(path.sep);
    debug('命中地址入参:', moduleName);
    absolutePath = await _traversalPaths(moduleName,paths);

    debug('命中地址:', absolutePath);
    if(absolutePath){
        return absolutePath;
    }


    throw new Error(`模块${moduleName}未找到`);

}


/**
 * 将模块名称转换为绝对地址 补足文件后缀.js
 * 逐层上查寻址
 * 如果是绝对地址 直接返回
 * @param moduleName 模块名称
 * @param context 环境目录地址
 */
async function getAbsoluteFileName(moduleName, context) {
    if(moduleName.indexOf('!')!== -1){
        return moduleName;
    }
    //补足文件后缀
    if (path.extname(moduleName) === '') {
        moduleName = moduleName + '.js'
    }
    //如果模块名称
    if (!path.isAbsolute(moduleName)) {
        moduleName =await _addTransformRelativeToAbsolute(moduleName, context);
    }
    return moduleName;
}

module.exports = {
    readFile           : readFile, //fs.readFile promise化
    writeFilePromise   : writeFile,//fs.writeFile promise化
    getAbsoluteFileName: getAbsoluteFileName
};