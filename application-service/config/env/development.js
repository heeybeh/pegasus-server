/* jslint node: true */
'use strict';
module.exports = {
    port: 5000,
    logging: {
        name: 'application_server',
        streams: [{
            type: 'rotating-file',
            path: './log/pegasus-as.log',
            period: '1d',
            count: 7
        }]
    },
    core: {
        bus: {
            endpoint: "ws://integration-service-url"
        },
        logging: {
            name: 'core'
        }
    }
};