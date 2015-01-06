var core;

// set Node process vars in case they are not set
// target environment: development | qa (tst) | homologation (pp) | production
exports.load_proc_vars = function () {  
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';	
};


// set Global information into Node global var
// NOTE: Avoid having too much objects in global context.
exports.load_globals = function () {
	global.config = require('./config/all.js');	
};


// configure and initialize main modules
exports.bootstrap = function (settings) {
	var plogger = require('./app/utils/plogger.js')(settings.logSystem);
	var logger = plogger.getLogger(settings.logging);
	
	logger.info('Starting server blocks...');
	
	return;
};

// launch application server
exports.start = function (){
	
	try {
		// ***** LOADING GLOBALS *****
		this.load_proc_vars();
		this.load_globals();

		// ***** Starting Server Modules *****
		core = this.bootstrap(global.config);
		
		
	} catch (err) {
	    core.logger.fatal(err);
	    throw err;
	}
};