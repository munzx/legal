'use strict';

// intitiate the app and Inject all of the app module dependencies
//configure the routes
var legality = angular.module('legality', ['btford.socket-io', 'ngAnimate', 'adminModule', 'ui.bootstrap', 'ui.router','ngResource', 'authModule', 'homeModule', 'userModule', 'defendantModule', 'clientModule', 'courtModule', 'caseModule', 'caseRoleModule', 'updateTypesModule', 'consultantModule', 'chart.js', 'AngularPrint', 'employeeModule', 'calendarModule', 'uploadModule', 'caseTypeModule', 'reportModule', 'timelineModule']);

//RouteScopes & Routes Configurations 
legality.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'ChartJsProvider', function ($urlRouterProvider, $stateProvider, $locationProvider, ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
    	responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
    	datasetFill: true,
    	skipLabels: true
    });

	$urlRouterProvider.otherwise('notfound');
	$stateProvider
		.state('notfound',{
			url: '/notfound',
			templateUrl: 'public/modules/config/view/notfound.config.view.html',
			controller: 'errorConfigController',
			cache: false
		})
		.state('home', {
			url: '/',
			templateUrl: 'public/modules/home/view/index.home.view.html',
			controller: 'indexHomeController',
			cache: false
		})
		.state('about',{
			url: '/about',
			templateUrl: 'public/modules/home/view/about.home.view.html',
			controller: 'indexHomeController',
			cache: false
		})
		.state('signin', {
			url: '/signin',
			templateUrl: 'public/modules/auth/view/signin.auth.view.html',
			controller: 'signinAuthController',
			cache: false
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'public/modules/auth/view/signup.auth.view.html',
			controller: 'signupAuthController',
			cache: false
		})
		.state('providerSignIn', {
			url: '/signin/provider/:id',
			templateUrl: 'public/modules/auth/view/provider.signin.auth.view.html',
			controller: 'signInProviderAuthController',
			cache: false
		})
		.state('signout', {
			url: '/signout',
			controller: 'signoutAuthController',
			cache: false
		})
		.state('profile', {
			url: '/profile',
			templateUrl: 'public/modules/user/view/profile.user.view.html',
			controller: 'profileUserController',
			cache: false
		})
		.state('admin', {
			url: '/admin',
			cache: false,
			abstract: true,
			templateUrl: 'public/modules/admin/view/index.admin.view.html',
			controller: 'indexAdminController'
		})
		.state('admin.report', {
			url: '/report',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/report/view/index.report.view.html',
					controller: 'indexReportController'
				}
			}
		})
		.state('admin.timeline', {
			url: '/timeline',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/timeline/view/index.timeline.view.html',
					controller: 'indexTimelineController'
				}
			}
		})
		.state('admin.memos', {
			url: '/memos',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/case/view/memos.case.view.html',
					controller: 'memosCaseController'
				}
			}
		})
		.state('admin.users', {
			url: '/users',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/users.admin.view.html',
					controller: 'usersAdminController'
				}
			}
		})
		.state('admin.defendants', {
			url: '/defendant',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/defendant.admin.vew.html',
					controller: 'defendantAdminController'
				}
			}
		})
		.state('admin.cases', {
			url: '/cases',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/case/view/index.case.view.html',
					controller: 'indexCaseController'
				}
			}
		})
		.state('admin.sessions', {
			url: '/sessions',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/case/view/sessions.case.view.html',
					controller: 'sessionsCaseController'
				}
			}
		})
		.state('admin.settings', {
			url: '/settings',
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/settings.admin.view.html',
					controller: 'settingsAdminController'
				}
			}
		})
		.state('admin.settings.courts', {
			url: '/courts',
			cache: false,
			views : {
				'page': {
					templateUrl: 'public/modules/admin/view/courts.admin.view.html',
					controller: 'courtsAdminController'
				}
			}
		})
		.state('admin.settings.caseRole', {
			url: '/caserole',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/caserole.admin.view.html',
					controller: 'caseRoleAdminController'
				}
			}
		})
		.state('admin.settings.updatetypes', {
			url: '/updatetypes',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/update.admin.view.html',
					controller: 'updateTypesAdminController'		
				}
			}
		})
		.state('admin.settings.casetypes', {
			url: '/casetypes',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/admin/view/casetypes.admin.view.html',
					controller: 'caseTypeAdminController'					
				}
			}
		})
		.state('admin.tasks', {
			url: '/tasks',
			cache: false,
			views: {
				'page': {
					templateUrl: 'public/modules/calendar/view/index.calendar.view.html',
					controller: 'indexCalendarController'					
				}
			}
		})
		.state('employee', {
			url: '/employee',
			cache: false,
			abstract: true,
			templateUrl: 'public/modules/employee/view/index.employee.view.html',
			controller: 'indexEmployeeController'
		})
		.state('employee.sessions', {
			url: '/sessions',
			cache: false,
			views: {
				'employee': {
					templateUrl: 'public/modules/case/view/sessions.case.view.html',
					controller: 'sessionsCaseController'
				}
			}
		})
		.state('employee.cases', {
			url: '/cases',
			cache: false,
			views: {
				'employee': {
					templateUrl: 'public/modules/case/view/index.case.view.html',
					controller: 'indexCaseController'
				}
			}
		})
		.state('employee.tasks', {
			url: '/tasks',
			cache: false,
			views: {
				'employee': {
					templateUrl: 'public/modules/calendar/view/index.calendar.view.html',
					controller: 'indexCalendarController'
				}
			}
		})
		.state('consultant', {
			url: '/consultant',
			cache: false,
			abstract: true,
			templateUrl: 'public/modules/consultant/view/index.consultant.view.html',
			controller: 'indexConsultantController'
		})
		.state('consultant.memos', {
			url: '/memos',
			cache: false,
			views: {
				'consultant': {
					templateUrl: 'public/modules/case/view/memos.case.view.html',
					controller: 'memosCaseController'
				}
			}
		})
		.state('consultant.tasks', {
			url: '/tasks',
			cache: false,
			views: {
				'consultant': {
					templateUrl: 'public/modules/calendar/view/index.calendar.view.html',
					controller: 'indexCalendarController'
				}
			}
		})
		.state('consultant.sessions', {
			url: '/sessions',
			cache: false,
			views: {
				'consultant': {
					templateUrl: 'public/modules/case/view/sessions.case.view.html',
					controller: 'sessionsCaseController'
				}
			}
		})
		.state('consultant.cases', {
			url: '/cases',
			cache: false,
			views: {
				'consultant': {
					templateUrl: 'public/modules/case/view/index.case.view.html',
					controller: 'indexCaseController'
				}
			}
		})
		.state('client', {
			url: '/client',
			cache: false,
			abstract: true,
			templateUrl: 'public/modules/client/view/dashboard.client.view.html',
			controller: 'dashboardClientController'
		})
		.state('client.case', {
			url: '/case',
			cache: false,
			views: {
				'client': {
					templateUrl: 'public/modules/case/view/index.case.view.html',
					controller: 'indexCaseController'
				}
			}
		});

		$locationProvider.html5Mode(true).hashPrefix('!');
}])
.run(['$rootScope', '$location', '$state', 'registerUserConfigFactory', function ($rootScope, $location, $state, registerUserConfigFactory) {
	//remove the extra sympoles that is inserted by facebook redirect "when facebook redirect to the success login pagein server side"
	//when  a user try to sign up through facebook
	if ($location.hash() === '_=_'){
		$location.hash(null);
	}

	$rootScope.$on('$stateChangeSuccess', function() {
	   document.body.scrollTop = document.documentElement.scrollTop = 20;
	});

	//add a query to the page
	if(window.query){
		//redirect the user to the needed page
		if(window.query.page){
			$location.path(window.query.page);
		}
		//add query to the site url so it can be read by the concerned page
		$location.search(query.key, query.value);
	}


	//if the user is not logged in then redirect to the home/login page
	var user = registerUserConfigFactory.getUser();
	if(!user){
		$location.path('/');
	}

	$rootScope.logged = false;
	$rootScope.lastPage = '';
}]);