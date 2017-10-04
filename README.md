# base-webpack

## 简介
学习webpack,实现一个简单webpack

## 实现功能
1. 将多个符合CommonJS规范的模块打包成一个JS文件，以供浏览器执行
2. loader机制(例子 example/loader, 内置了less-loader和style-loader,可以加载less文件)

## TODO


## 使用
```
git clone https://github.com/youzaiyouzai666/base-webpack.git
cd base-webpack
npm i  //安装模块
npm link  //把全局模式 base-webpack链接到本地
base-webpack examples/base/example.js   //构建output.js
用浏览器打开base-webpack/examples/simple/index.html文件
查看控制台,就可以看到构建的output.js的执行结果
 ```


## 参考
1. [[webpack]源码解读：命令行输入webpack的时候都发生了什么？](https://github.com/DDFE/DDFE-blog/issues/12)
2. [Webpack 源码（一）—— Tapable 和 事件流](https://segmentfault.com/a/1190000008060440)
3. [webpack插件 API(Plugin API)](https://doc.webpack-china.org/api/plugins/)