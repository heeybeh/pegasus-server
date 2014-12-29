// FUTURE: check about different configurations for lint, hint and mocha based on build purposal.
var SRC_CODE = [ 'server.js' ], 
	gulp = require('gulp'), 
	del = require('del'), 
	jshint = require('gulp-jshint'), 
	jslint = require('gulp-jslint'),
	mocha = require('gulp-mocha');

// TODO: check about mocha-lcov-reporter and multiple reporters.
gulp.task('test:unit', function() {
	
	return gulp.src(['test/unit/**/test-*.js'], {read: false})
	.pipe(mocha({
		reporter: 'spec',
		timeout: 200
	}));
	
});

gulp.task('test', [ 'test:unit' ]);

gulp.task('lint', function() {
	return gulp.src(SRC_CODE)
	.pipe(jslint({
		// these directives can
		// be found in the official
		// JSLint documentation.
		node: true,
		evil: true,
		nomen: true,

		// you can also set global
		// declarations for all source
		// files like so:
		global: [],
		predef: [],
		// both ways will achieve the
		// same result; predef will be
		// given priority because it is
		// promoted by JSLint

		// pass in your prefered
		// reporter like so:
		reporter: 'default',
		// ^ there's no need to tell gulp-jslint
		// to use the default reporter. If there is
		// no reporter specified, gulp-jslint will use
		// its own.

		// specify whether or not
		// to show 'PASS' messages
		// for built-in reporter
		errorsOnly: false	
	}))
	    // error handling:
        // to handle on error, simply
        // bind yourself to the error event
        // of the stream, and use the only
        // argument as the error object
        // (error instanceof Error)
        .on('error', function (error) {
            console.error(String(error));
        });
});

gulp.task('hint', function() {
	return gulp.src(SRC_CODE)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
});

gulp.task('clean', function(cb) {
	del('dist', cb);
});

gulp.task('all', [ 'clean', 'hint', 'lint', 'test' ]);
gulp.task('default', [ 'all' ]);