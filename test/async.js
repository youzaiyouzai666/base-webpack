const fs = require('fs');
var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};
async  function gen (){
    var r1 = await  readFile('./co.js');
    console.log(r1.toString());
    var r2 = await  readFile('./index.js');
    console.log(r2.toString());
};
var g = gen();

