/* jslint node: true */
'use strict';

var morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler');


module.exports = function(app, cfg) {
    
    // saving app context to centralize these settings
    app.set('target_env', process.env.NODE_ENV);
    app.set('http_port', process.env.PORT || cfg.http.port);
    app.set('https_port', process.env.PORT || cfg.https.port);
    
    // Only use logger for development environment
    if  ('development' === app.get('target_env')) {
        app.use(morgan('dev'));
        app.use(require('express-bunyan-logger')(cfg.logging));
    }    
    
    // general expres app configurations
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};