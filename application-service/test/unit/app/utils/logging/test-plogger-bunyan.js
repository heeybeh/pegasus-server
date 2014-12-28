describe('plogger-bunyan', function () {
	var logsys;
	var _ = require('lodash');
	var expect = require('expect.js');
	var sinon = require('sinon');
	
	
	before('@before', function () {
		logsys = require('../../../../../app/utils/logging/plogger-bunyan');
	});
	
	describe('#getRawFw()', function () {
		it('should return bunyan log system', function () {
			var target = _.cloneDeep(logsys);
			var result = target.getRawFw();
			
			expect(result).to.not.be(undefined);
			expect(result).to.not.be(null);
			expect(result).to.be.a('function');
			expect(result.VERSION).to.equal('1.2.3');
		});
	});
	
	describe('#create()', function () {
		it('should create a log object', function () {
		});
	});
	
	describe('#child()', function () {
		it('should...', function () {
			
		});
		
	});
});