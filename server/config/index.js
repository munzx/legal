var localAuth = require('./auth/local.strategy');
var email = require('./email');
var testEnv = require('./env/test');
var devEnv = require('./env/development');
var proEnv = require('./env/production');
var api_v1 = process.env.PWD + '/server/api/v1';


module.exports = {
	api: api_v1,
	auth: {
		local: localAuth
	},
	env: {
		test: testEnv,
		development: devEnv,
		production: proEnv
	},
	getEnvInfo: function () {
		return this.env[process.env.NODE_ENV] || this.env['development'];
	}
}