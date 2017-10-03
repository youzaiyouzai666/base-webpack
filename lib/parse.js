/**
 * @file 解析模块中包含的依赖（require）
 */
const esprima = require('esprima');

function dealRequires(requires,expression){
    if(expression.type === 'CallExpression' && expression.callee.type === 'Identifier' && expression.callee.name === 'require' && expression.arguments){
        const param      = Array.from(expression.arguments)[0];
        requires.push({
            name        : param.value,
            nameRange   : param.range, //变量范围
            requireRange: expression.callee.range  //require的范围
        })
    }else if(expression.type === 'CallExpression' && expression.callee.type === 'CallExpression' ){
        dealRequires(requires,expression.callee);
        if(expression.arguments){
            dealRequires(requires,expression.arguments[0]);
        }
    }
    return requires;
}

function walkVariableDeclaration(body) {
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
                    name        : param.value,
                    nameRange   : param.range, //变量范围
                    requireRange: expression.callee.range  //require的范围
                })
            })
        });
    return requires;
}
function walkExpressionStatement(body){
    let requires   = [];
    const bodys = body.filter(element => (element.type === 'ExpressionStatement' && element.expression));
    bodys.forEach(
        ele => {
            dealRequires(requires,ele.expression);
        });
    return requires;
}

/**
 *
 * @param bodys
 */
function dealAst(bodys){
    for(let i=0; i< bodys.length; i++){
        let body = bodys[i];
        if(body.type === 'VariableDeclaration'){
            return walkVariableDeclaration(bodys);
        }else if(body.type === 'ExpressionStatement'){
            return walkExpressionStatement(bodys);
        }
    }

}

module.exports = function (source) {
    let ast = esprima.parse(source, {range: true});


    return dealAst(ast.body);
};


