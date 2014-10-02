/* jslint node: true */
'use strict';

exports.isDebugMode = function(req, res, next) {  
    var isDebug = global.config.debug || false;
    
    if (!isDebug) {
        // FIXME: change to constants
        return res.send(401);
    }
    
    next();
};