var _ = require('lodash');
var bunyan = require('bunyan');

exports.create = function(cfg) {
	return bunyan.createLogger(cfg);
};

exports.child = function(cfg, parentLogger) {
	var logcfg = _.extend({
		widget_type : ''
	}, cfg);

	logcfg.widget_type = logcfg.name;
	delete logcfg.name;

	return parentLogger.child(logcfg);
};