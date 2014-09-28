/* jslint node: true */
'use strict';
module.exports = {
    port: 5000,
    logging: {
        console: true,
        logstash: false
    },
    bus: {
        pis : {
            endpoint: 'integration-service-websocket-endpoint-url'
        }
    }
};