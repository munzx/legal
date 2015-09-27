'use strict';

//Dependencies
var cms = require('../controllers/cms'),
	users = require('../controllers/user'),
	admin = require('../controllers/admin'),
	test = require('../controllers/test'),
	court = require('../controllers/court'),
	consultant = require('../controllers/consultant'),
	employee = require('../controllers/employee'),
	client = require('../controllers/client'),
	defendant = require('../controllers/defendant'),
	caseRole = require('../controllers/caseRole'),
	updateType = require('../controllers/updateType'), 
	account = require('../controllers/account'),
	courtCase = require('../controllers/case'),
	calendar = require('../controllers/calendar'),
	passport = require('passport'),
	authLocal = require('./auth/local.strategy');

module.exports = function (app, express) {
	//Assign variable to rename the PASSPORT local authentication strategy
	var Auth = passport.authenticate('local');
	//check if the user is authinticated
	function ensureAuthenticated(req, res, next){
		if(req.isAuthenticated()){
			next();
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//check if the user role is admin
	function isAdmin(req, res, next){
		if(req.user){
			if(req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//check if the user role is user
	//grant the admin an access to any of the user route/controller
	function isUser(req, res, next){
		if(req.user){
			if(req.user.role === 'consultant' || req.user.role === 'employee'  || req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	function isClient(req, res, next){
		if(req.user){
			if(req.user.role === 'client' || req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	function isEmployee(req, res, next){
		if(req.user){
			if(req.user.role === 'employee' || req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	function isConsultant(req, res, next){
		if(req.user){
			if(req.user.role === 'consultant' || req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	//Check is the user is a gues i.e not "logged in"
	function isGuest (req, res, next) {
		if(req.isAuthenticated()){
			res.status(403).jsonp('You are already signed in , please sign out before signing up!');
		} else {
			next();
		}
	}

	//Index page
	app.get('/', function(req, res){
		res.render('../public/modules/config/view/index', {
			isAuthenticated: req.isAuthenticated(),
			userInfo: req.user,
			query: {}
		});
	});

	//Check if the user info is complete
	app.get('/provider/:id', function(req, res){
		res.render('../public/modules/config/view/index', {
			isAuthenticated: req.isAuthenticated(),
			userInfo: req.user,
			query: {page: '/signin/provider/' + req.params.id}
		});
	});

	//Check login credentials
	app.post('/login', Auth, function(req, res){
		res.status(200).json(req.user);
	});

	//Logout
	app.get('/logout', function(req, res){
		req.logout();
		res.status(200).json('logged out');
	});

	//check if user is logged in
	app.get('/check', isUser, function(req, res){
		res.status(200).json('logged in');
	});

	//set up routing to use version 1
	var v1 = express.Router();
	app.use('/api', v1);

	//register version and use it
	v1.use('/v1', express.Router()
		//test zone
		.get('/test', test.index)
		//Cms
		.get('/cms/contact', ensureAuthenticated, isAdmin, cms.contactIndex)
		.post('/cms/contact', isGuest, cms.contact)
		//Account (provider as twitter or facebook)
		.get('/account/:id', account.getById)
		.post('/account/:id', account.completeProviderProfile)
		.get('/account/status/:userID', account.AccountsStatus)
		.get('/account/link/:id', account.linkProviderAccount)
		//admin
		.get('/admin', ensureAuthenticated, isAdmin, admin.index)
		.get('/admin/first', admin.createFirst)
		//courts
		.get('/admin/court', court.index)
		.post('/admin/court', ensureAuthenticated, isUser, court.create)
		.delete('/admin/court/:id', ensureAuthenticated, isEmployee, court.remove)
		//clients
		.get('/admin/client', ensureAuthenticated, isUser, client.index)
		//consultants
		.get('/admin/consultant', ensureAuthenticated, isUser, consultant.index)
		//employees
		.get('/admin/employee', ensureAuthenticated, isUser, employee.index)
		//case
		.get('/case', ensureAuthenticated, isUser, courtCase.index)
		.post('/case', ensureAuthenticated, isUser, courtCase.create)
		.delete('/case/:id', ensureAuthenticated, isUser, courtCase.remove)
		.get('/case/sessions', isUser, ensureAuthenticated, courtCase.sessionDates)
		.get('/case/sessions/upcoming', ensureAuthenticated, isUser, courtCase.upcomingSessions)
		.get('/case/sessions/previous', ensureAuthenticated, isUser, courtCase.previousSessions)
		.post('/case/caseupdate/:id', ensureAuthenticated, isUser, courtCase.insertCaseUpdate)
		.post('/case/tasks/updatebydate', ensureAuthenticated, isUser, courtCase.byDate)
		.post('/case/tasks/updatebycase', ensureAuthenticated, isUser, courtCase.byCase)
		.get('/case/memos/pending', ensureAuthenticated, isUser, courtCase.memosPending)
		.get('/case/memos/closed', ensureAuthenticated, isUser, courtCase.memosClosed)
		.post('/case/memos/insertconsultant', ensureAuthenticated, isUser, courtCase.insertMemoConsultant)
		.get('/case/consultant/:id/memos', courtCase.consultantMemos)
		.post('/case/client', ensureAuthenticated, isUser, courtCase.insertClient)
		.post('/case/client/new', ensureAuthenticated, isUser, courtCase.insertNewClient)
		.delete('/case/:caseId/client/:clientId', ensureAuthenticated, isUser, courtCase.clientSilentRemove)
		.delete('/case/:caseId/defendant/:defendantId', ensureAuthenticated, isUser, courtCase.defendantSilentRemove)
		.post('/case/defendant', ensureAuthenticated, isUser, courtCase.insertDefendant)
		.post('/case/defendant/new', ensureAuthenticated, isUser, courtCase.insertNewDefendant)
		//caseRoles
		.get('/caserole', ensureAuthenticated, isUser, caseRole.index)
		.post('/caseRole', ensureAuthenticated, isAdmin, caseRole.create)
		.delete('/caserole/:id', ensureAuthenticated, isAdmin, caseRole.remove)
		//updateTypes
		.get('/updatetype', ensureAuthenticated, isUser, updateType.index)
		.post('/updatetype', ensureAuthenticated, isAdmin, updateType.create)
		.delete('/updatetype/:id', ensureAuthenticated, isAdmin, updateType.remove)
		//defendant
		.get('/defendant', ensureAuthenticated, isUser, defendant.index)
		.post('/defendant', ensureAuthenticated, isAdmin, defendant.create)
		.delete('/defendant/:id', ensureAuthenticated, isAdmin, defendant.remove)
		//Users
		.get('/user', users.index) //get all users
		.post('/user', ensureAuthenticated, isUser, users.create) //create a new user
		.put('/user', ensureAuthenticated, isAdmin, users.update) //update user info
		.put('/user/password', ensureAuthenticated, isUser, users.changePassword) //update the user password
		.delete('/user/:id', ensureAuthenticated, isAdmin, users.remove) //delete user
		.get('/user/:name', ensureAuthenticated, isUser, users.getByName) //get a user by name
		.get('/user/search/:phrase', ensureAuthenticated, isUser, users.search)
		//calendar
		.get('/calendar', ensureAuthenticated, isUser, calendar.index)
		.post('/calendar', ensureAuthenticated, isUser, calendar.create)
		.get('/calendar/:id/done', ensureAuthenticated, isUser, calendar.markDone)
		.get('/calendar/:id/reject', ensureAuthenticated, isUser, calendar.rejectTask)
		.delete('/calendar/:id/softRemove', ensureAuthenticated, isUser, calendar.softRemove)
	);

	//404 Route/Page has not been found
	app.use(function (req, res) {
		res.render('../public/modules/config/view/index', {
			isAuthenticated: req.isAuthenticated(),
			userInfo: req.user,
			query: {}
		});
	});
}
