/* jslint node:true */
var _ = require('lodash'),
    bunyan = require("bunyan");

exports.createLogger = function (cfg) {
    return bunyan.createLogger(cfg);
};

exports.createChild = function (cfg, parentLogger) {
    
    var logcfg = _.extend({widget_type: ''}, cfg);
    
    logcfg.widget_type = logcfg.name;
    delete logcfg.name;

    return parentLogger.child(logcfg);
};

exports.getLogger = function (cfg, parentLogger) {
    return (
        parentLogger ?  
        this.createChild(cfg, parentLogger) :
        this.createLogger(cfg)
    );
};