/* jslint node: true */
'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash');

// Extend the base configuration in base.js with environment
// specific configuration
module.exports = _.extend(
    require(__dirname + '/../config/env/base.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {}
);