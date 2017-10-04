const util  = require('./util');
const debug = require('debug')('loaderPlugin');

class LoaderPlugin {
    /**
     * 得到loaders绝对地址数组，并将moduleName push()到最后，返回，将整个数组装换成字符串.join('!')
     * @param rules
     * @param {string} moduleName
     * @param context
     * @return 数组.join('!')
     */
    async addIdentifiers(rules, moduleName, context) {
        let loaders = [];
        let results = [];
        if (moduleName.indexOf('!') !== -1) {
            return moduleName.substr(moduleName.startsWith('!') ? 1 : 0);
        }
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (rule.test.test(moduleName)) {
                loaders = loaders.concat(rule.use);
                results = results.concat(await _getAbsoluteLoaders(loaders, context));
            }
        }

        debug('results', results);

        results.push(moduleName);
        debug('生成loader地址', results.join('!'));
        return results.join('!');
    }

    /**
     *
     * @param request
     * @param loaders
     * @param content
     * @returns {Promise}
     */
    execLoaders(request, loaders, content ) {
        return new Promise((resolve, reject) => {
            if (!loaders.length) {
                resolve(content);
                return;
            }

            let loaderFunctions = [];
            loaders.forEach(loaderName => {
                let loader = require(loaderName);
                loaderFunctions.push(loader);
            });

            nextLoader(content);

            /***
             * 调用下一个 loader
             * @param {string} content 上一个loader的输出字符串
             */
            function nextLoader(content) {
                if (!loaderFunctions.length) {
                    resolve(content);
                    return;
                }
                // 请注意: loader有同步和异步两种类型。对于异步loader,如 less-loader,
                // 需要执行 async() 和 callback(),以修改标志位和回传字符串
                let async = false;
                let context = {
                    request,
                    async: () => {
                        async = true;
                    },
                    callback: (content) => {
                        // 异步loader 递归调用下一个 loader
                        nextLoader(content);
                    }
                };

                let ret = loaderFunctions.pop().call(context, content);
                if(!async) {
                    // 同步loader 递归调用下一个 loader
                    nextLoader(ret);
                }

            }
        });

    }
}

/**
 * 将loader名称 转化为绝对地址
 * @param{array} loaders loader相对名称
 * @param context 入口文件目录
 * @returns absoluteAddresses loaders转换绝对地址后数组
 */
async function _getAbsoluteLoaders(loaders, context) {
    let absoluteAddresses = [];
    for (let i = 0; i < loaders.length; i++) {
        let loader = loaders[i];
        absoluteAddresses.push(await util.getAbsoluteFileName(loader, context));
    }
    return absoluteAddresses;
}

module.exports = new LoaderPlugin();