var path = require('path');

function PegasusLogger(logSystem) {
	this.logSys = logSystem;
}

PegasusLogger.prototype.getLogger = function (cfg, parentLogger) {
    return (
        parentLogger ?  
        this.logSys.child(cfg, parentLogger) :
        this.logSys.create(cfg)
    );
};

/* istanbul ignore next */
function setup (logSystem) {
	var framework = path.resolve(__dirname) + '/' + logSystem;
	return new PegasusLogger(require(framework)); 
}

module.exports = setup;