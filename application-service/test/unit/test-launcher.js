describe('launcher', function () {
	var launcher;
	var expect = require('expect.js');
	
	before('@before', function () {
		launcher = require('../../launcher.js');
	});
	
	describe('#load_proc_vars()', function () {
		
		beforeEach('@ cleaning process environment', function () {
			delete process.env.NODE_ENV;
		});

		afterEach('@ cleaning process environment', function () {
			delete process.env.NODE_ENV;
		});		
		
		it('should set default target node environment', function () {
			launcher.load_proc_vars();
			expect(process.env.NODE_ENV).to.be.eql('development');
		});
		
		it('should respect target node environment', function () {
			process.env.NODE_ENV = 'qa';

			launcher.load_proc_vars();
			
			expect(process.env.NODE_ENV).to.be.eql('qa');
		});
	});
	
	describe('#load_globals()', function () {
		beforeEach('@ cleaning globals', function () {
			delete global.config;
			launcher.load_proc_vars();
		});
		
		afterEach('@ cleaning globals', function () {
			delete global.config;
		});
		
		
		it('should load config object', function () {
			launcher.load_globals('./config/all');
			
			expect(global.config).not.be(undefined);
			expect(global.config).not.be(null);
		});
		
		it('should load root path into config object', function () {
			launcher.load_globals('./config/all');
			
			expect(global.config.root).not.be(undefined);
			expect(global.config.root).not.be(null);
		});
		
		it('should specify a log proxy into config object', function () {
			launcher.load_globals('./config/all');
			
			expect(global.config.log_proxy).not.be(undefined);
			expect(global.config.log_proxy).not.be(null);
		});
	});

	describe('#init_logging()', function () {});
	describe('#init_core()', function () {});
	
});