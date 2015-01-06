var path = require('path');
var core, router, logger, plogger_factory ;

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
	var log_obj;
	
	plogger_factory = require('./app/utils/plogger.js')(settings.log_proxy);
	log_obj = plogger_factory.getLogger(settings.logging);
	
	log_obj.info('Log system has been started...');
	return log_obj;	
};


// 
exports.loadWidget = function (settings, wname, mainLogger) {
	var fullpath = path.resolve(path.join(__dirname, '/app/widgets')) + '/' + wname;
	var widget = require(fullpath)(settings[wname], mainLogger);
	return widget;
};


//
exports.getServerContext = function () {
	return null;
};

// launch application server
exports.bootstrap = function (settings_file){
	
	try {
		// ***** Loading Globals *****
		this.load_proc_vars();
		this.load_globals(settings_file);
		
		
		// ***** Starting logging systems *****
		logger = this.init_logging(global.config);
		
		
		// ***** Starting Server Modules (widgets) *****
		logger.info('Starting server blocks...');
		
		core   = this.loadWidget(global.config.widgets, 'core', logger);
		core.init();
		
		router   = this.loadWidget(global.config.widgets, 'router', logger);
		router.init();
		
	} catch (err) {
	    logger.fatal(err);
	    throw err;
	}
};