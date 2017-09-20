/**
 * @file 解析模块中包含的依赖（require）
 */
const esprima = require('esprima');

function dealAst(body) {
    let requires   = [];
    const elements = body.filter(element => (element.type === 'VariableDeclaration' && element.declarations));
    elements.forEach(
        ele => {
            ele.declarations.filter(
                declaration => (declaration.type === 'VariableDeclarator'
                    && declaration.init
                    && declaration.init.type === "CallExpression"
                    && declaration.init.callee
                    && declaration.init.callee.name === 'require'
                    && declaration.init.callee.type === 'Identifier'
                    && declaration.init.arguments
                    && declaration.init.arguments.length === 1
                )
            ).forEach(declaration => {
                const expression = declaration.init;
                requires         = requires || [];
                const param      = Array.from(expression.arguments)[0];
                requires.push({
                    name: param.value
                })
            })
        });
    return requires;
}

module.exports = function (source) {
    let ast = esprima.parse(source, {range: true});

    return dealAst(ast.body);
};


