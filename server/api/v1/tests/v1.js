'use strict';

//Dependencies
var mongoose = require('mongoose');
var expect = require('expect.js');
var superagent = require('superagent');

//Models
var calendar = require('./../models/calendar');
var feeds = require('./../models/feed');
var users = require('./../models/user');
var courts = require('./../models/court');
var caseTypes = require('./../models/caseType');
var caseRoles = require('./../models/caseRole');
var updateTypes = require('./../models/updateType');
var defendants = require('./../models/defendant');
var cases = require('./../models/case');

//start agent
var agent = superagent.agent();


var prefix = 'http://localhost:3000/';
var api = prefix + 'api/v1/';
//to hold ids to be used on other tests
var IDs = {};

//to delete anythng in the DB before and after running tests
var cleanDB = function () {
	calendar.remove().exec();
	feeds.remove().exec();
	cases.remove().exec();
	defendants.remove().exec();
	updateTypes.remove().exec();
	caseRoles.remove().exec();
	caseTypes.remove().exec();
	courts.remove().exec();
	users.remove().exec();
}


before(function(done){
	//to make sure that we are on test envoirenment
	expect(process.env.NODE_ENV).to.be('test');
	//Connect to mongoDB
	mongoose.connect('mongodb://localhost/test');
	cleanDB();
	done();
});

describe('Manage First Admin', function () {
	it('Should create first admin', function (done) {
		agent.get(api + 'admin/first')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should fail double creating first admin', function (done) {
		agent.get(api + 'admin/first')
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Courts', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a new court', function (done) {
		agent.post(api + 'admin/court')
		.send({courtInfo: {name:'Dubai Court', city:'Dubai', address: 'Dubai city'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.courtID = res.body._id;
			done();
		});
	});
	it('Should fail to create a new court with same name', function (done) {
		agent.post(api + 'admin/court')
		.send({courtInfo: {name:'Dubai Court', city:'Dubai', address: 'Dubai city'}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create another new court', function (done) {
		agent.post(api + 'admin/court')
		.send({courtInfo: {name:'Dubai Traffic Court', city:'Dubai', address: 'Dubai city'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get the courts', function (done) {
		agent.get(api + 'admin/court')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('Dubai Court');
			expect(res.body[1].name).to.be('Dubai Traffic Court');
			done();
		});
	});
	it('Should soft remove the first court', function (done) {
		agent.del(api + 'admin/court/' + IDs.courtID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('Dubai Court');
			expect(res.body.removed).to.be(true);
			done();
		});
	});
	it('Should get the available courts i.e. not removed', function (done) {
		agent.get(api + 'admin/court/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('Dubai Traffic Court');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});

describe('Manage Case Types', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a new case type', function (done) {
		agent.post(api + 'casetype')
		.send({caseTypeInfo: {name: 'initial'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('initial');
			IDs.casetypeID = res.body._id;
			done();
		});
	});
	it('Should refuse to create a duplicated case type', function (done) {
		agent.post(api + 'casetype')
		.send({caseTypeInfo: {name: 'initial'}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create a new case type', function (done) {
		agent.post(api + 'casetype')
		.send({caseTypeInfo: {name: 'trial'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('trial');
			done();
		});
	});
	it('Should soft remove the first case type', function (done) {
		agent.del(api + 'casetype/' + IDs.casetypeID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('initial');
			expect(res.body.removed).to.be(true);
			done();
		});
	});
	it('Should get the available case Types i.e. not removed', function (done) {
		agent.get(api + 'casetype/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('trial');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Case Roles', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a case role', function (done) {
		agent.post(api + 'caserole')
		.send({caseRoleInfo: {name: 'claimer'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('claimer');
			IDs.caseroleID = res.body._id;
			done();
		});
	});
	it('Should refuse to create a duplicated case role', function (done) {
		agent.post(api + 'caserole')
		.send({caseRoleInfo: {name: 'claimer'}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create another case role', function (done) {
		agent.post(api + 'caserole')
		.send({caseRoleInfo: {name: 'claimed'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('claimed');
			done();
		});
	});
	it('Should create a third case role', function (done) {
		agent.post(api + 'caserole')
		.send({caseRoleInfo: {name: 'witeness'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('witeness');
			done();
		});
	});
	it('Should get case roles', function (done) {
		agent.get(api + 'caserole')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('claimer');
			expect(res.body[1].name).to.be('claimed');
			expect(res.body[2].name).to.be('witeness');
			done();
		});
	});
	it('Should soft remove the first case role', function (done) {
		agent.del(api + 'caserole/' + IDs.caseroleID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('claimer');
			expect(res.body.removed).to.be(true);
			done();
		});
	});
	it('Should get available case role i.e. not removed', function (done) {
		agent.get(api + 'caserole/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('claimed');
			expect(res.body[1].name).to.be('witeness');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage case updates', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a new case update with all updates options true', function (done) {
		agent.post(api + 'updatetype')
		.send({updatetypesInfo: {
			name: 'testUpdate',
			requiredId: true,
			requireRoleUpdate: true,
			requiredIdTitle: 'testRequireId',
			requestMemo: true,
			requestMemoTitle: 'TestMemoTitle',
			requireNextSession: true,
			requireDeadline: true,
			requireRemarks: true
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('testUpdate');
			expect(res.body.requiredId).to.be(true);
			expect(res.body.requireRoleUpdate).to.be(true);
			expect(res.body.requiredIdTitle).to.be('testRequireId');
			expect(res.body.requestMemo).to.be(true);
			expect(res.body.requestMemoTitle).to.be('TestMemoTitle');
			expect(res.body.requireNextSession).to.be(true);
			expect(res.body.requireDeadline).to.be(true);
			expect(res.body.requireRemarks).to.be(true);
			IDs.updateID = res.body._id;
			done();
		});
	});
	it('Should create a "memo" case update', function (done) {
		agent.post(api + 'updatetype')
		.send({updatetypesInfo: {
			name: 'memo',
			requestMemo: true,
			requestMemoTitle: 'memo text',
			requireDeadline: true,
			requireRemarks: 'Bism Allah'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('memo');
			expect(res.body.requestMemo).to.be(true);
			expect(res.body.requestMemoTitle).to.be('memo text');
			expect(res.body.requireDeadline).to.be(true);
			expect(res.body.requireRemarks).to.be(true);
			IDs.updateMemoID = res.body._id;
			done();
		});
	});
	it('Should create "session" case update', function (done) {
		agent.post(api + 'updatetype')
		.send({updatetypesInfo: {
			name: 'session',
			requireNextSession: true,
			requireDeadline: true,
			requireRemarks: true
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('session');
			expect(res.body.requireNextSession).to.be(true);
			expect(res.body.requireDeadline).to.be(true);
			expect(res.body.requireRemarks).to.be(true);
			IDs.updateSessionID = res.body._id;
			done();
		});
	});
	it('Should soft remove the first case update type', function (done) {
		agent.del(api + 'updatetype/' + IDs.updateID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('testUpdate');
			expect(res.body.removed).to.be(true);
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Users', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a new user with admin role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneadmin',
			email: 'admin@user.com',
			role: 'admin',
			mobilePhone: '139374673',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('oneadmin');
			IDs.adminID = res.body._id;
			done();
		});
	});
	it('Should fail to create a duplicated user with admin role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneadmin',
			email: 'admin@user.com',
			role: 'admin',
			mobilePhone: '139374673',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create a new user with employee role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneemployee',
			email: 'employee@user.com',
			role: 'employee',
			mobilePhone: '1393741334',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('oneemployee');
			IDs.employeeID = res.body._id;
			done();
		});
	});
	it('Should fail to create a duplicated user with employee role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneemployee',
			email: 'employee@user.com',
			role: 'employee',
			mobilePhone: '1393741334',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create a new user with client role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneclient',
			email: 'client@user.com',
			role: 'client',
			mobilePhone: '1343473',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('oneclient');
			IDs.clientID = res.body._id;
			done();
		});
	});
	it('Should fail to create a duplicated user with client role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneclient',
			email: 'client@user.com',
			role: 'client',
			mobilePhone: '1343473',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should create a new user with consultant role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneconsultant',
			email: 'consultant@user.com',
			role: 'consultant',
			mobilePhone: '34343139374673',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('oneconsultant');
			IDs.consultantID = res.body._id;
			done();
		});
	});
	it('Should fail to create a duplicated user with consultant role', function (done) {
		agent.post(api + 'user')
		.send({userInfo: {
			firstName: 'someone',
			lastName: 'alsoSomeone',
			name: 'oneconsultant',
			email: 'consultant@user.com',
			role: 'consultant',
			mobilePhone: '34343139374673',
			address: 'Dubai . somewhere in the city',
			password: 'somePassword'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should soft remove the newly created admin', function (done) {
		agent.del(api + 'user/' + IDs.adminID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.name).to.be('oneadmin');
			done();
		});
	});
	it('Should get all available users i.e not removed and name is not admin', function (done) {
		agent.get(api + 'user/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].role).to.be('employee');
			expect(res.body[1].role).to.be('client');
			expect(res.body[2].role).to.be('consultant');
			expect(res.body.length).to.be(3);
			done();
		});
	});
	it('Should update the user password', function (done) {
		agent.put(api + 'user')
		.send({info: {password: 'Dubai@123', newPassword: 'Dubai@123', mobilePhone: '3974637469837'}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			expect(res.body.mobilePhone).to.be('3974637469837');
			done();
		});
	});
	it('Should get user by name', function (done) {
		agent.get(api + 'user/admin')
		.end(function (err, res) {
			expect(res.body.role).to.be('admin');
			expect(res.body.name).to.be('admin');
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should search and get the user name', function (done) {
		agent.get(api + 'user/search/admin')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].name).to.be('admin');
			expect(res.body[0].role).to.be('admin');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Clients', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should get the client', function (done) {
		agent.get(api + '/admin/client')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].role).to.be('client');
			done();
		});
	});
	it('Should get the available cients', function (done) {
		agent.get(api + '/admin/client/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].role).to.be('client');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Consultants', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should get the consultants', function (done) {
		agent.get(api + '/admin/consultant')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].role).to.be('consultant');
			done();
		});
	});
	it('Should get the available consultants', function (done) {
		agent.get(api + '/admin/consultant/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].role).to.be('consultant');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Employees', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should get the employees', function (done) {
		agent.get(api + '/admin/employee')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get the available employees', function (done) {
		agent.get(api + '/admin/employee/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get the employees non legal', function (done) {
		agent.get(api + '/admin/employee/nonlegal')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get the available employees non legal', function (done) {
		agent.get(api + '/admin/employee/nonlegal/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Defendants', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Should create a defendant', function (done) {
		agent.post(api + 'defendant')
		.send({defendantInfo: {
			firstName: 'defendantFirstName',
			lastName: 'defendantLastName',
			address: 'defendant address',
			mobilePhone: '1736873146'
		}})
		.end(function (err, res) {
			expect(res.body.firstName).to.be('defendantFirstName');
			expect(res.status).to.be(200);
			IDs.toBeRenovedDefendantId = res.body._id;
			done();
		});
	});
	it('Should create another new defendant', function (done) {
		agent.post(api + 'defendant')
		.send({defendantInfo: {
			firstName: 'defendantFirstName2',
			lastName: 'defendantLastName2',
			address: 'defendant address2',
			mobilePhone: '17368731462'
		}})
		.end(function (err, res) {
			expect(res.body.firstName).to.be('defendantFirstName2');
			expect(res.status).to.be(200);
			IDs.defendantID = res.body._id;
			done();
		});
	});
	it('Should refuse create a duplicated defendant', function (done) {
		agent.post(api + 'defendant')
		.send({defendantInfo: {
			firstName: 'defendantFirstName',
			lastName: 'defendantLastName',
			address: 'defendant address',
			mobilePhone: '1736873146'
		}})
		.end(function (err, res) {
			expect(res.status).to.be(500);
			done();
		});
	});
	it('Should soft remove a defendant', function (done) {
		agent.del(api + 'defendant/' + IDs.toBeRenovedDefendantId)
		.end(function (err, res) {
			expect(res.body.firstName).to.be('defendantFirstName');
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get available defendant i.e. not removed defendants', function (done) {
		agent.get(api + '/defendant/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body[0].firstName).to.be('defendantFirstName2');
			done();
		});
	});
	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});


describe('Manage Cases', function () {
	it('Should login as admin', function (done) {
		agent.post(api + 'login')
		.send({ username: 'admin', password: 'Dubai@123'})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.role).to.be('admin');
			agent.saveCookies(res);
			done();
		});
	});
	it('Shoud Create a new case', function (done) {
		agent.post(api + 'case')
		.send({caseInfo: {
			defendant: { user: IDs.defendantID, role: 'someRole'},
			client: {user: IDs.clientID, role: 'someRole'},
			caseType: 'someCaseType',
			caseDate: new Date(),
			caseNumber: '1231413',
			subject: 'Bism Allah',
			facts: 'Here is the new case test',
			court: IDs.courtID,
			consultant: IDs.consultantID
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.caseID = res.body._id;
			done();
		});
	});
	it('Should insert a new case update, the update type is memo', function (done) {
		agent.post(api + 'case/caseupdate/' + IDs.caseID)
		.send({update: {
			name: 'someUpdateType',
			updateId: '123',
			updateInfo: 'update info or remarks',
			memoRequired: true,
			memoId: 'memo123',
			memoType: 'memoType',
			memoStatus: 'memoStatus',
			deadline: new Date(),
			memoConsultant: IDs.consultantID
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.firstCaseuUpdateID = res.body.updates[res.body.updates.length - 1]._id;
			done();
		});
	});
	it('Should get the updates', function (done) {
		agent.get(api + 'case/updates/'+ IDs.caseID)
		.end(function (err, res) {
			expect(res.body[0].updateType).to.be('someUpdateType');
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get the available updates ', function (done) {
		agent.get(api + 'case/updates/'+ IDs.caseID + '/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(1);
			done();
		});
	});
	it('Should soft remove the update', function (done) {
		agent.del(api + 'case/caseupdate/' + IDs.caseID + '/' + IDs.firstCaseuUpdateID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get no update in the available updates ', function (done) {
		agent.get(api + 'case/updates/'+ IDs.caseID + '/available')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(0);
			done();
		});
	});
	it('Should create a new memo', function (done) {
		agent.post(api + 'case/caseupdate/' + IDs.caseID)
		.send({update: {
			name: 'someUpdateType',
			updateId: '123',
			updateInfo: 'update info or remarks',
			memoRequired: true,
			memoId: 'memo123',
			memoType: 'memoType',
			memoStatus: 'memoStatus',
			deadline: new Date(),
			memoConsultant: IDs.consultantID
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.caseuUpdateMemoID = res.body.updates[res.body.updates.length - 1]._id;
			done();
		});
	});
	it('Should create a new session', function (done) {
		agent.post(api + 'case/caseupdate/' + IDs.caseID)
		.send({update: {
			sessionRequired: true,
			session: {
				newDate: new Date(),
				newTime: new Date()
			},
			name: 'someSession',
			updateId: '123',
			updateInfo: 'update info or remarks',
			deadline: new Date()
		}})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.secondUpdateSessionID = res.body.updates[res.body.updates.length - 1]._id;
			done();
		});
	});
	it('Should get all cases with sessions', function (done) {
		agent.get(api + 'case/sessions')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(1);
			done();
		});
	});
	it('Should get upcoming sessions', function (done) {
		agent.get(api + 'case/sessions/upcoming')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(1);
			done();
		});
	});
	it('Should get previous sessions', function (done) {
		agent.get(api + 'case/sessions/previous')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(0);
			done();
		});
	});
	it('Should update case tasks by date', function (done) {
		agent.post(api + 'case/tasks/updatebydate')
		.send({
			info: {
				lawyerID: IDs.consultantID,
				courtID: IDs.courtID,
				dateFrom: new Date(),
				dateTo: new Date()
			}
		})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should update case tasks by case', function (done) {
		agent.post(api + 'case/tasks/updatebycase')
		.send({
			info: {
				lawyerID: IDs.consultantID,
				caseID: IDs.caseID,
				dateFrom: new Date(),
				dateTo: new Date()
			}
		})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get pendding memos', function (done) {
		agent.get(api + 'case/memos/pending')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(2);
			done();
		});
	});
	it('Should assign a memo to a consultant', function (done) {
		agent.post(api + 'case/memos/insertconsultant')
		.send({
			update: {
				caseId: IDs.caseID,
				memoId: IDs.caseuUpdateMemoID,
				memoConsultantId: IDs.consultantID
			}
		})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get closed memos', function (done) {
		agent.get(api + 'case/memos/closed')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(0);
			done();
		});
	});
	it('Should get pending memos', function (done) {
		agent.get(api + 'case/memos/pending')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(2);
			done();
		});
	})
	it('Should get a single memo', function (done) {
		agent.get(api + 'case/' + IDs.caseID + '/memos/' + IDs.caseuUpdateMemoID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.caseId).to.be(IDs.caseID);
			done();
		});
	});
	it('Should insert a new client to a case', function (done) {
		agent.post(api + 'case/client/new')
		.send({
			caseId: IDs.caseID,
			userInfo: {
				firstName: 'someone',
				lastName: 'alsoSomeone',
				name: 'newclient',
				email: 'newclient@user.com',
				role: 'client',
				mobilePhone: '07827348738478',
				address: 'Dubai . somewhere in the city',
				password: 'somePassword'
			}
		})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.newClientID = res.body.client[res.body.client.length - 1]._id;
			done();
		});
	});
	it('Should get client cases , no case yet', function (done) {
		agent.get(api + 'case/client')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(0);
			done();
		});
	});
	it('Should insert a new case defendant', function (done) {
		agent.post(api + 'case/defendant/new')
		.send({
			caseId: IDs.caseID,
			userInfo: {
				firstName: 'asdasd',
				lastName: 'asdasd',
				address: 'asdadad',
				mobilePhone: '8738343874'
			}
		})
		.end(function (err, res) {
			expect(res.status).to.be(200);
			IDs.newDefendantID = res.body.defendant[res.body.defendant.length - 1]._id;
			done();
		});
	});
	it('Should soft remove case client', function (done) {
		agent.del(api + 'case/' + IDs.caseID + '/client/' + IDs.newClientID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('should soft remove case defendant', function (done) {
		agent.del(api + 'case/' + IDs.caseID + '/defendant/' + IDs.newDefendantID)
		.end(function (err, res) {
			expect(res.status).to.be(200);
			done();
		});
	});
	it('Should get consultant memos', function (done) {
		agent.get(api + 'case/consultant/' + IDs.consultantID + '/memos')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body.length).to.be(1);
			done();
		});
	});
	//Should close a memo which will require uploading test
	//Should write test for uploading docs and search

	it('Should logout', function (done) {
		agent.get(api + 'logout')
		.end(function (err, res) {
			expect(res.status).to.be(200);
			expect(res.body).to.be('logged out');
			done();
		});
	});
});

after(function(done){
	cleanDB();
	mongoose.connection.close();
	done();
});