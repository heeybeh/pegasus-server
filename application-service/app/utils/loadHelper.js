/* jslint node: true */
'use strict ';

var fs = require('fs');

exports.walk= function walk(path, loadParams) {
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (stat.isFile()) {
            if (/(.*)\.(js$|coffee$)/.test(file)) {
                
                // if it is a "functional" module, it will try to apply loadParams to the module
                // case else, it was loaded already and you don't need to call.
                var temp = require(newPath);
                if (temp.apply) {
                    temp.apply(null, loadParams);
                }
                
            }
            // We skip the app/routes/middlewares directory as it is meant to be
            // used and shared by routes as further middlewares and is not a 
            // route by itself
        } else if (stat.isDirectory() && file !== 'middlewares') {
            walk(newPath);
        }
    });
};