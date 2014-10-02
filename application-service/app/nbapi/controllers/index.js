/* jslint node: true */
'use strict';
var pkg = require('../../../package.json');

exports.hit = function indexHit(req, res, next) {

    // once wildcards are not allowed with "Credentials", try a workaround 
    res.header("Access-Control-Allow-Origin", req.headers.origin);                      
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    next();
};

exports.root = function indexRoot(req, res) {
    
    // TODO: work on message padronization
    // * http response codes
    // * make this shit dynamic
    var result = {
        status: 200,        
        ok: true,
        name: "PAS_0",
        version : pkg.version
    };

    //FIXME: it does not make sense at all.
    // cleaning session
    //req.session.destroy();
    res.json(result);
};