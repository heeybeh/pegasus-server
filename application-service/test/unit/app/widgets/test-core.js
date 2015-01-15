describe('core', function () {
	var core;
	var expect = require('expect.js');
	var sinon = require('sinon');
	
	before('@before', function () {
		// core object
		core = require('../../../../app/widgets/core')({
			log_proxy: 'plogger-bunyan',
			logging: {
				name: 'core-unit-test',
				streams: []
			}
		});

		// mocking logger
		core.logger = {
				info: sinon.spy(),
				debug: sinon.spy()
		};
	});
	
	describe('#setup()', function () {
		it('should return an object', function () {
			var target = require('../../../../app/widgets/core');
			
			expect(target).not.to.be(undefined);
			expect(target).not.to.be(null);
		});
	});
	
	describe('#init()', function () {
		it('should... do stuff', function () {
			core.init();
		});
	});	
});