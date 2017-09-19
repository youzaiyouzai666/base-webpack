const fs = require('fs');

//将 fs promise化
function readFile(fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
}


module.exports = {
    readFile: readFile
};