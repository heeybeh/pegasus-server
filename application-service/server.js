/* jslint node: true */
var express = require('express');

/**
* Main application entry file.
* Please be aware that the order of loading matters...
*/

// Setting node environment vars in case they are not set
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ***** LOADING GLOBALS *****
// NOTE: Avoid having too much objects in global context.
global.config  = require('./config/all.js');


// ***** Starting Server Modules *****

// TODO: Logging



// TODO: initialize server modules
/*
    - json-rpc / websockets
    - DAOs (couch + elasticsearch)
    - dynamic-router
    - logging (with logstash or not)
*/


// Configuring Express JS
var app = express();
require('./config/express.js')(app);

// TODO: bootstrap routes


// ***** Start the app by listening on <port> *****
// NOTE: The Http Port is set on config file, based on each target environment (development, test, etc...)
app.listen(app.get('http_port'));
console.log('Pegasus Application Server is up and flying...', app.get('http_port'));

// exporting app to node context
exports = module.exports = app;
