/* jslint node: true */
var express = require('express');

// Setting node environment vars in case they are not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ***** LOADING GLOBALS *****
// NOTE: Avoid having too much objects in global context.
global.config  = require('./config/all.js');


// ***** Starting Server Modules *****
var logger = require('./app/utils/logger.js')('server.js');


logger.blank();
logger.log('Starting server blocks...');
logger.blank();

// core block
var core = require('./app/core.js');
core.init(global.config.bus);


/* TODO: bootstrap subsystems
    * Load routing system (and get info from integration module)
    * Load elastic system
    * Connect with couch DB
    * Bootstrap API routes
*/

// Configuring Express JS
var app = express();
require('./config/express.js')(app);

// ***** Start the app by listening on <port> *****
// NOTE: The Http Port is set on config file, based on each target environment (development, test, etc...)
app.listen(app.get('http_port'));
logger.blank().blank().log('Pegasus Application Server is up and flying at port ' + app.get('http_port') + '...');

// exporting app to node context
exports = module.exports = app;