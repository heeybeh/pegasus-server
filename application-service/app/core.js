/* jslint node:true */
'use strict';

var logger = require('./utils/logger')('bus.js');

// TODO: this module is the most important to orchestrate the others.
/*
    - websocket connection with integration service;
    - load routes from remote and configurations;
    - events to inform connection status!?
    - add and remove listeners !?
*/
exports.init = function (cfg) {
    logger.trace().log('Initializing message bus system with default settings:');
    logger.trace().info(cfg);
};