describe('plogger', function () {
	var logger;
	var expect = require('expect.js');
	var sinon = require('sinon');
	

	before('@before', function () {
		// logger object
		logger = require('../../../../app/utils/plogger')('plogger-bunyan');
	});
	
	describe('#setup()', function () {
		it('should return an object', function () {
			var target = require('../../../../app/utils/plogger')('plogger-bunyan');
			
			expect(target).not.to.be(undefined);
			expect(target).not.to.be(null);
		});
	});
	
	describe('#getLogger()', function () {
		
		beforeEach('@beforeEach', function () {
			logger.logSys.create = sinon.spy();
			logger.logSys.child = sinon.spy();		
		});
		
		it('should create a parent logger', function () {
			
			console.log(logger.logSys);
			
			logger.getLogger();
			
			expect(logger.logSys.create.calledOnce).to.be.ok();
			expect(logger.logSys.child.notCalled).to.be.ok();
		});
		
		it('should create a child logger', function () {
			
			console.log(logger.logSys);
			
			logger.getLogger('fake-cfg-object', 'fake-parent-object');
			
			expect(logger.logSys.create.notCalled).to.be.ok();
			expect(logger.logSys.child.calledOnce).to.be.ok();
		});		
	});
	
});