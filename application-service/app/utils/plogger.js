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

function setup (logSystem) {
	return new PegasusLogger(require('./logging/' + logSystem)); 
}

module.exports = setup;