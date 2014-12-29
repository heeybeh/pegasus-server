describe('plogger-bunyan', function () {
	var logsys, mocked, instance;
	var _ = require('lodash');
	var assert = require('assert');
	var expect = require('expect.js');
	var sinon = require('sinon');


	before('@before', function () {
		// pure log object
		logsys = require('../../../../../app/utils/logging/plogger-bunyan');
		
		//mocked instance
		instance = {};
		
		// mocked module
		mocked = {};
		mocked.createLogger = sinon.stub().returns(instance);
	});

	
	
	describe('#getRawFw()', function () {
		it('should return bunyan log system version 1.2.3', function () { 
			var result = logsys.getRawFw();

			expect(result).to.not.be(undefined);
			expect(result).to.not.be(null);
			expect(result).to.be.a('function');
			expect(result.VERSION).to.equal('1.2.3');
		});
	});

	
	
	describe('#create()', function () {
		beforeEach(function () {
			sinon.stub(logsys, 'getRawFw').returns(mocked);
		});
		
		afterEach(function () {
			logsys.getRawFw.restore();
		});
		
		it('should create a log object', function () {
			var cfg = 'my-config';
			var result = logsys.create(cfg);
			
			assert(logsys.getRawFw.calledOnce);
			assert(mocked.createLogger.calledWith(cfg));
			assert.equal(result, instance, 'is not creating the logger instance properly.');
		});
	});

	
	
	describe('#child()', function () {
		it('should...', function () {
			
		});
	});
});