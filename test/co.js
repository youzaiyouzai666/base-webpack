/**
 * 参考：http://www.ruanyifeng.com/blog/2015/05/thunk.html
 * @type {*|co.co|co}
 */
const co = require('co');
const fs = require('fs');
function thunkify(fn){
    return function(){
        var args = new Array(arguments.length);
        var ctx = this;

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        return function(done){
            var called;

            args.push(function(){
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
};

var readFile = thunkify(fs.readFile);
var gen = function* (){
    var r1 = yield readFile('./co.js');
    console.log(r1.toString());
    var r2 = yield readFile('./index.js');
    console.log(r2.toString());
};

/*function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }

    next();
}
run(gen);*/
//co(gen);

var g = gen();

var r1 = g.next();
r1.value(function(err, data){
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data){
        if (err) throw err;
        g.next(data);
    });
});