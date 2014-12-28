// Setting node environment vars in case they are not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//***** LOADING GLOBALS *****
//NOTE: Avoid having too much objects in global context.
global.config  = require('./config/all.js');

//***** Starting Server Modules *****

// https://www.npmjs.com/package/bunyan-elasticsearch
var logger = require('./app/utils/plogger.js').getLogger(global.config.logging);
logger.info('Starting server blocks...');

//core block
var core = require('./app/core.js')(global.config.core, logger);
core.init();