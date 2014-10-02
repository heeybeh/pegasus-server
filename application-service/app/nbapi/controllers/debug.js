/* jslint node: true */
'use strict';

var pkg = require('../../../package.json');

exports.root = function debugRoot(req, res) {

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

    result.dependencies = pkg.dependencies;

    result.settings = {
        path: global.config.root
    };


    res.json(result);
};