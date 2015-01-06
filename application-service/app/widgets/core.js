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

/* istanbul ignore next */
function setup (cfg, parentLogger) {
	var plogger = require('./utils/plogger.js')(cfg.log_proxy);
    var logger = plogger.getLogger(cfg.logging, parentLogger);
    return new PegasusCore(cfg, logger);
}

module.exports = setup;