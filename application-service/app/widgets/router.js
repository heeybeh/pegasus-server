var express = require('express'), http = require('http'), https = require('https'), lHelper = require('../utils/loadHelper');

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

PegasusRouter.prototype.loadAPI = function (path) {
    var fullPath = global.config.root + path;

    try {
        this.logger.info('Loading API ', path);
        this.logger.debug('- API full path located at ', fullPath);

        if (this.app) {
            lHelper.walk(fullPath, [this.app]);
        } else {
            this.logger.error("Unable to load <" + path + "> because Pegasus router was not initialized!");
        }
    } catch (e) {
        this.logger.error('Error loading API: ', path);
        this.logger.debug('DETAILS:', e);
    }
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
        } else {
            this.logger.warn('Pegasus HTTP Server is not enabled.');
        }
    } catch (e) {
        this.logger.error('Unexpected error starting Pegasus HTTP server!');
        this.logger.debug('Details: ', e);

        // FIXME: normalize error messages
        throw 'Unexpected error when initializing Pegasus HTTP Server!'; 
    }

    // working on HTTPS server
    if (this.config.https.enabled) {
        this.logger.warn('Pegasus HTTPS Server is not available in this version.');
    } else {
        this.logger.warn('Pegasus HTTPS Server is not enabled! Please consider enable it to provide a secure API.');
    }
};

PegasusRouter.prototype.stop = function (cb) {
	var self = this;
	
	//
	if (self.config.http.enabled) {
		
		// closing http
		self.httpServer.close(function () {
			
			// if https is enabled
			if (self.config.https.enabled) {
				self.httpsServer.close(cb);
			} else {
				cb();
			}
		});
	} else {
		//
		self.httpsServer.close(cb);
	}
};


/* istanbul ignore next */
module.exports = function (cfg, parentLogger) {
	return new PegasusRouter(cfg, parentLogger);
};