/* jslint node: true */
'use strict';

var pkg = require('../../../package.json');

exports.hit = function indexHit(req, res, next) {


    // once wildcards are not allowed with "Credentials", try a workaround 
    res.header("Access-Control-Allow-Origin", req.headers.origin);                      
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Authorization, Accept');
    //console.log(req.sessionID, req.method, req.originalUrl);

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
        tagline: pkg.description,
        version : {
            number : pkg.version,
            build_hash: "0a5781f44876e8d1c30b6360628d59cb2a7a2bbb",
            build_timestamp: "2014-01-10T10:18:37Z",
        }
    };

    if (process.env.NODE_ENV === 'development') {
        result.dependencies = pkg.dependencies;
    }

    //FIXME: it does not make sense at all.
    // cleaning session
    //req.session.destroy();

    res.json(result);
};