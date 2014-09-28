/* jslint node:true */
'use strict';

// defining logger 
function LoggerObj (ref) {
    this.prefix = ref || '';
    this.config = global.config.logging ||  {
        console: true,
        logstash: false
    };
    
    this.buffer = [];
}

// handling buffered messages
LoggerObj.prototype.readBuffer = function () {
    var buffered = "";

    if (this.buffer.length !== 0) {
        for (var lot in this.buffer) {
            buffered += this.buffer[lot];
        }
    }
    
    this.buffer = [];
    return buffered;
};

// empty lines - saves into log system
LoggerObj.prototype.jump = function () {
    this.log('');
    return this;
};

// blank lines - do not dispatch to log system
LoggerObj.prototype.blank = function () {
    console.log('\n');
    return this;
};

// blank lines - do not dispatch to log system
LoggerObj.prototype.trace = function () {
    this.buffer.push('-');
    return this;
};

// relay to log system
LoggerObj.prototype.relay = function (method, msg) {
    var path;

    // printing to console
    if (this.config.console) {
        path = (this.prefix ? '['+ this.prefix +']' +  this.readBuffer() : '');
        console[method](path, msg);
    }        
};

// log system interface
LoggerObj.prototype.log = function (msg) {
    this.relay('log', msg);
};

LoggerObj.prototype.info = function (msg) {
    this.relay('info', msg);
};
LoggerObj.prototype.warn = function (msg) {
    this.relay('warn', msg);
};
LoggerObj.prototype.error = function (msg) {
    this.relay('error', msg);
};

// FUTURE: evaluate logging format base on Winston or Logastash.
module.exports = function (name) {
    // returning object
    return new LoggerObj(name);
};
