module.exports = {

	// debug switch
	debug : true,
	log_proxy: 'plogger-bunyan',

	// general logging config
	logging : {
		name : 'application_server',
		streams : [ {
			stream : process.stdout,
			level : (this.debug ? 'debug' : 'info')
		}, {
			type : 'rotating-file',
			path : './logs/pegasus-as.log',
			period : '1d',
			count : 7
		} ]
	},

	widgets : {

		// core widget configuration
		core : {
			name : 'pas-core',
			bus : {
				endpoint : "ws://integration-service-url"
			}
		},

		// router widget configuration
		router : {
			name : 'pas-router',
			http : {
				enabled : true,
				port : 5000								// RFC default is 80
			},
			https : {
				enabled : false,
				port : 5001, 							// RFC default is 443
				ssl : {
					privateKey : {
						format : 'utf8',
						path : 'sslcert/server.key'
					},
					certificate : {
						format : 'utf8',
						path : 'sslcert/server.crt'
					}
				}
			}
		}
	}
};