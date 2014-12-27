/* jslint node: true */
'use strict';
module.exports = {
    debug: true,
    logging: {
        name: 'application_server',
        streams: [
            {
                stream: process.stdout,
                level: 'debug'
            },
            {
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
            name: 'pas-core'
        }
    },
    router: {
        logging: {
            name: 'pas-router'
        },    
        http: {
            enabled: true,
            port: 5000      // RFC default is 80
        },
        https: {
            enabled: false,
            port: 5001,     // RFC default is 443
            ssl: {
                privateKey: {
                    format: 'utf8',
                    path: 'sslcert/server.key'
                },
                certificate: {
                    format: 'utf8',
                    path: 'sslcert/server.crt'
                }                
            }
        }
    }
};