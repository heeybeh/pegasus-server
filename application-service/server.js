// This is a launcher wrapper only.
// Not supposed to contain any further code or logic.
// If you think about putting any code here, please tell to the team before doing anything stupid.

try {
	var launcher = require('./launcher');
	launcher.bootstrap('./config/all');
} catch(err) {
	console.log(err);
    process.exit(-1);
} finally {
    // exporting app to node context
	exports = module.exports = launcher.getServerContext();
}