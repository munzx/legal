'use strict';

//Dependencies
var multer = require('multer'),
storage = multer.diskStorage({
	destination: 'uploads/',
	filename: function(req, file, cb){
		cb(null, Date.now() + '-' + file.originalname);
	}
}),
upload = multer({ storage: storage}),
cms = require('../controllers/cms'),
users = require('../controllers/user'),
admin = require('../controllers/admin'),
test = require('../controllers/test'),
court = require('../controllers/court'),
consultant = require('../controllers/consultant'),
employee = require('../controllers/employee'),
client = require('../controllers/client'),
defendant = require('../controllers/defendant'),
caseRole = require('../controllers/caseRole'),
caseType = require('../controllers/caseType'),
updateType = require('../controllers/updateType'),
account = require('../controllers/account'),
courtCase = require('../controllers/case'),
calendar = require('../controllers/calendar'),
report = require('../controllers/report'),
passport = require('passport'),
authLocal = require('./auth/local.strategy'),
timeline = require('../controllers/timeline');


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
			if(req.user.role === 'consultant' || req.user.role === 'employee' || req.user.role === 'client' || req.user.role === 'admin'){
				next();
			} else {
				res.status(403).json('Access Denied');
			}
		} else {
			res.status(403).json('Access Denied');
		}
	}

	function isUserNotClient(req, res, next){
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
	var api = express.Router();
	app.use('/api', api);

	//register version and use it
	api.use('/v1', express.Router()
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
	.get('/admin/court', ensureAuthenticated, isUser, court.index)
	.get('/admin/court/available', ensureAuthenticated, isUser, court.available)
	.post('/admin/court', ensureAuthenticated, isUserNotClient, court.create)
	.delete('/admin/court/:id', ensureAuthenticated, isUserNotClient, court.silentRemove)
	//Report
	.get('/admin/report/:dateFrom?/:dateTo?', ensureAuthenticated, isAdmin, report.index)
	//clients
	.get('/admin/client', ensureAuthenticated, isUserNotClient, client.index)
	.get('/admin/client/available', ensureAuthenticated, isUserNotClient, client.available)
	//consultants
	.get('/admin/consultant', ensureAuthenticated, isUserNotClient, consultant.index)
	.get('/admin/consultant/available', ensureAuthenticated, isUserNotClient, consultant.available)
	//employees
	.get('/admin/employee', ensureAuthenticated, isUserNotClient, employee.index)
	.get('/admin/employee/available', ensureAuthenticated, isUserNotClient, employee.available)
	.get('/admin/employee/nonlegal/', ensureAuthenticated, isUserNotClient, employee.nonlegal) //no consultants or admins
	.get('/admin/employee/nonlegal/available', ensureAuthenticated, isUserNotClient, employee.nonlegalAvailable) //no consultants or admins
	//case
	.get('/case', ensureAuthenticated, isUserNotClient, courtCase.index)
	.get('/case/available', ensureAuthenticated, isUser, courtCase.caseAvailable)
	.post('/case', ensureAuthenticated, isUserNotClient, courtCase.create)
	.delete('/case/:id', ensureAuthenticated, isUserNotClient, courtCase.softRemove)
	.get('/case/updates/:id', ensureAuthenticated, isUser, courtCase.updates)
	.get('/case/updates/:id/available', ensureAuthenticated, isUser, courtCase.updatesAvailable)
	//.get('/case/updates/withids', ensureAuthenticated, isUser, courtCase.updatesWithId)
	.get('/case/sessions', ensureAuthenticated, isUserNotClient, courtCase.sessionDates)
	.get('/case/sessions/upcoming', ensureAuthenticated, isUserNotClient, courtCase.upcomingSessions)
	.get('/case/sessions/previous', ensureAuthenticated, isUserNotClient, courtCase.previousSessions)
	.post('/case/caseupdate/:id', ensureAuthenticated, isUserNotClient, courtCase.insertCaseUpdate)
	.delete('/case/caseupdate/:id/:updateId', ensureAuthenticated, isUserNotClient, courtCase.softRemoveCaseUpdate)
	.post('/case/tasks/updatebydate', ensureAuthenticated, isUserNotClient, courtCase.byDate)
	.post('/case/tasks/updatebycase', ensureAuthenticated, isUserNotClient, courtCase.byCase)
	.get('/case/memos/pending', ensureAuthenticated, isUserNotClient, courtCase.memosPending)
	.get('/case/memos/closed', ensureAuthenticated, isUserNotClient, courtCase.memosClosed)
	.post('/case/memos/insertconsultant', ensureAuthenticated, isAdmin, courtCase.insertMemoConsultant)
	.get('/case/consultant/:id/memos', ensureAuthenticated, isConsultant, courtCase.consultantMemos)
	.get('/case/client', ensureAuthenticated, isClient, courtCase.getCase)
	.post('/case/client', ensureAuthenticated, isUserNotClient, courtCase.insertClient)
	.post('/case/client/new', ensureAuthenticated, isUserNotClient, courtCase.insertNewClient)
	.delete('/case/:caseId/client/:clientId', ensureAuthenticated, isUserNotClient, courtCase.clientSofttRemove)
	.delete('/case/:caseId/defendant/:defendantId', ensureAuthenticated, isUserNotClient, courtCase.defendantSoftRemove)
	.post('/case/defendant', ensureAuthenticated, isUser, courtCase.insertDefendant)
	.post('/case/defendant/new', ensureAuthenticated, isUserNotClient, courtCase.insertNewDefendant)
	.post('/case/search', ensureAuthenticated, isUserNotClient, courtCase.search)
	.get('/case/:caseID/docs', ensureAuthenticated, isUser, courtCase.docs)
	.get('/case/:caseID/download/:docID', ensureAuthenticated, isUser, courtCase.downloadDoc)
	.post('/case/:caseID/upload', ensureAuthenticated, isUserNotClient, upload.single('doc') , courtCase.uploadDoc)
	.delete('/case/:caseID/upload/:docID', ensureAuthenticated, isUserNotClient, courtCase.removeDoc)
	//caseType
	.get('/casetype', ensureAuthenticated, isUser, caseType.index)
	.get('/casetype/available', ensureAuthenticated, isUser, caseType.available)
	.post('/casetype', ensureAuthenticated, isAdmin, caseType.create)
	.delete('/casetype/:id', ensureAuthenticated, isAdmin, caseType.softRemove)
	//caseRoles
	.get('/caserole', ensureAuthenticated, isUser, caseRole.index)
	.get('/caserole/available', ensureAuthenticated, isUser, caseRole.available)
	.post('/caseRole', ensureAuthenticated, isAdmin, caseRole.create)
	.delete('/caserole/:id', ensureAuthenticated, isAdmin, caseRole.softRemove)
	//updateTypes
	.get('/updatetype', ensureAuthenticated, isUser, updateType.index)
	.get('/updatetype/available', ensureAuthenticated, isUser, updateType.available)
	.post('/updatetype', ensureAuthenticated, isAdmin, updateType.create)
	.delete('/updatetype/:id', ensureAuthenticated, isAdmin, updateType.softRemove)
	//defendant
	.get('/defendant', ensureAuthenticated, isUser, defendant.index)
	.get('/defendant/available', ensureAuthenticated, isUser, defendant.available)
	.post('/defendant', ensureAuthenticated, isUserNotClient, defendant.create)
	.delete('/defendant/:id', ensureAuthenticated, isUserNotClient, defendant.softRemove)
	.get('/defendant/search/:phrase', ensureAuthenticated, isUser, defendant.search)
	//Users
	.get('/user', ensureAuthenticated, isUserNotClient, users.index) //get all users
	.get('/user/available', ensureAuthenticated, isUserNotClient, users.available)
	.post('/user', ensureAuthenticated, isAdmin, users.create) //create a new user
	.put('/user', ensureAuthenticated, isUser, users.update) //update user info
	.put('/user/password', ensureAuthenticated, isUser, users.changePassword) //update the user password
	.delete('/user/:id', ensureAuthenticated, isAdmin, users.softRemove) //delete user
	.get('/user/:name', ensureAuthenticated, isUserNotClient, users.getByName) //get a user by name
	.get('/user/search/:phrase', ensureAuthenticated, isUserNotClient, users.search)
	//Calendar
	.get('/calendar', ensureAuthenticated, isUserNotClient, calendar.index)
	.get('/calendar/pending', ensureAuthenticated, isUserNotClient, calendar.pending)
	.get('/calendar/close', ensureAuthenticated, isUserNotClient, calendar.closed)
	.post('/calendar', ensureAuthenticated, isUserNotClient, calendar.create)
	.post('/calendar/:id/done', ensureAuthenticated, isUserNotClient, calendar.markDone)
	.post('/calendar/:id/reject', ensureAuthenticated, isUserNotClient, calendar.rejectTask)
	.post('/calendar/:id/softRemove', ensureAuthenticated, isUserNotClient, calendar.softRemove)
	//timeline
	.get('/timeline', ensureAuthenticated, isUserNotClient, timeline.index)
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
