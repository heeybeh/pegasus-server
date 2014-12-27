/* jslint node:true */
'use strict';
var plogger = require('./utils/plogger.js');

// TODO: this module is the most important to orchestrate the others.
/*
    - websocket connection with integration service;
    - load routes from remote and configurations;
    - events to inform connection status!?
    - add and remove listeners !?
*/

function PegasusCore(cfg, log) {
    this.config = cfg;
    this.logger = log;
}

PegasusCore.prototype.init = function () {
    this.logger.info('Initializing Application Server Core block...');
    this.logger.debug(this.config);
};

module.exports = function (cfg, parentLogger) {
    var logger = plogger.getLogger(cfg.logging, parentLogger);
    
    // returning core block...
    return new PegasusCore(cfg, logger);
};