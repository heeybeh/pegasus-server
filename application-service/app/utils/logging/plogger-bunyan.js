var _ = require('lodash');

exports.getRawFw = function () {
	return require('bunyan');
};

exports.create = function(cfg) {
	return this.getRawFw().createLogger(cfg);
};

exports.child = function(cfg, parentLogger) {
	var logcfg = _.extend({
		widget_type : ''
	}, cfg);

	logcfg.widget_type = logcfg.name;
	delete logcfg.name;

	return parentLogger.child(logcfg);
};