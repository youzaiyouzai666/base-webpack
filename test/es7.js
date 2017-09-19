var fs = require('fs');

//将 fs promise化
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};

//Generator 函数
var gen = function* (){
    var f1 = yield readFile('./co.js');
    var f2 = yield readFile('./index.js');
    console.log(f1.toString());
    console.log(f2.toString());
};

//es7
var asyncReadFile = async function (){
    try{
        var f1 = await readFile('./co.js');
        var f0 = await cons(f1);
        var f2 = await readFile('./index2.js');
        console.log(f1.toString());
        console.log(f2.toString());
        console.log(f0);
    }catch (err){
        console.error(err);
    }

};
function cons(f1){
    console.log(f1);
    debugger;
    console.log('=============================console');
    return 'f000000000000000000000000000000000000000000000000000000'
}
asyncReadFile();