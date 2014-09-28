/* jslint node: true */
'use strict';
module.exports = {
    port: 5000,
    logging: {
        name: 'application_server',
        level: 'info'
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