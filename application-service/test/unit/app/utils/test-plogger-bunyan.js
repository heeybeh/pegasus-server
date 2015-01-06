describe('plogger-bunyan', function () {
	var logsys, mocked, instance;
	var _ = require('lodash');
	var expect = require('expect.js');
	var sinon = require('sinon');


	before('@before', function () {
		// pure log object
		logsys = require('../../../../app/utils/plogger-bunyan');
		
		//mocked instance
		instance = {};
		
		// mocked module
		mocked = {};
		mocked.createLogger = sinon.stub().returns(instance);
		mocked.child = sinon.stub().returns(instance);
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
			
			expect(logsys.getRawFw.calledOnce).to.be.ok();
			expect(mocked.createLogger.calledWith(cfg)).to.be.ok();
			expect(result).to.equal(instance);
		});
	});

	
	
	describe('#child()', function () {		
		it('should create a child log object', function () {
			var cfg = {"name": "cfg-name"};
			var exp = {"widget_type": "cfg-name"};
			
			var result = logsys.child(cfg, mocked);
			
			expect(mocked.child.calledOnce).to.be.ok();
			expect(mocked.child.calledWith(exp)).to.be.ok();
			expect(result).to.equal(instance);
		});
	});
});