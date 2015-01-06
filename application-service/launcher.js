var core, logger;

// set Node process vars in case they are not set
// target environment: development | qa (tst) | homologation (pp) | production
exports.load_proc_vars = function () {  
	process.env.NODE_ENV = process.env.NODE_ENV || 'development';	
};


// set Global information into Node global var
// NOTE: Avoid having too much objects in global context.
exports.load_globals = function (settings_file) {
	global.config = require(settings_file);	
};


//
exports.init_logging = function (settings) {
	var plogger = require('./app/utils/plogger.js')(settings.log_proxy);
	var log_obj = plogger.getLogger(settings.logging);
	
	log_obj.info('Log system has been started...');
	return log_obj;	
};


// 
exports.init_core = function (settings, mainLogger) {
};

// launch application server
exports.bootstrap = function (settings_file){
	
	try {
		// ***** LOADING GLOBALS *****
		this.load_proc_vars();
		this.load_globals(settings_file);

		// ***** Starting Server Modules *****
		logger = this.init_logging(global.config);
		logger.info('Starting server blocks...');
		
		// core block
		core = this.init_core(global.config.widgets.core, logger);
		//
		
	} catch (err) {
	    logger.fatal(err);
	    throw err;
	}
};