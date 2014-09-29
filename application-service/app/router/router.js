/* jslint node:true */
/* jslint node:true */
'use strict';
var plogger = require('../utils/plogger.js'),
    express = require('express'),
    http = require('http'),
    https = require('https');


function PegasusRouter(cfg, log) {
    this.app = null;
    this.config = cfg;
    this.logger = log;
    this.httpServer = null;
    this.httpsServer = null;
}

PegasusRouter.prototype.init = function (routeCfgObj) {
    this.logger.info('Configuring ExpressJS for routing...');
    this.app = express();
    routeCfgObj(this.app, this.config);
};

// TODO: load API
PegasusRouter.prototype.loadAPI = function () {
};

// TODO: build https credentials
PegasusRouter.prototype.getHttpsCredentials = function () {
};

PegasusRouter.prototype.start = function () {
    
    // working on HTTP Server
    try {
        if (this.config.http.enabled) {
            this.logger.info('Creating http server...');
            this.logger.debug('- HTTP Server Config: ', this.config.http);
            
            this.httpServer = http.createServer(this.app);
            this.httpServer.listen(this.config.http.port);
            
            this.logger.info('Pegasus HTTP Server listening on port ', this.config.http.port);
        } 
    } catch (e) {
        this.logger.error('Unexpected error starting Pegasus HTTP server!');
        this.logger.debug('Details: ', e);
        
        // FIXME: normalize error messages
        throw 'Unexpected error when initializing Pegasus HTTP Server!'; 
    }
    
    // FUTURE: work on HTTPS server
};

module.exports = function (cfg, parentLogger) {
    var logger = plogger.getLogger(cfg.logging, parentLogger);
    
    // returning router block...
    return new PegasusRouter(cfg, logger);
};