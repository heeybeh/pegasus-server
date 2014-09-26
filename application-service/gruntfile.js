/* global module */
module.exports = function (grunt) {
    'use strict';

    // Project Configuration
    grunt.initConfig({
        
        // cleaning last build
        clean: {
            options: {
                force: true,
                "no-write": false
            },
            dist: ["reports"]
        },

        // JS validator
        jshint: {
            source: ['server.js'],
            options: {
                force: false
            }
        },
        jslint: {
            client: {
                src: ['server.js'],
                directives: {
                    browser: true,
                    predef: ['global', 'process', 'require', 'console', 'exports', 'module']
                },
                options: {
                    junit: 'reports/jslint-junit.xml'
                }
            }
        }
    });

    // loading node dependencies
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');


    // run ALL targets
    grunt.registerTask('all', ['clean', 'jshint', 'jslint']);

    // Default task(s).
    grunt.registerTask('default', ['all']);
};