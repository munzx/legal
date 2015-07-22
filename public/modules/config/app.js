'use strict';

// intitiate the app and Inject all of the app module dependencies
//configure the routes
var yousufalsharif = angular.module('yousufalsharif', ['xeditable', 'akoenig.deckgrid', 'ngAnimate', 'infinite-scroll', 'adminModule', 'angulartics', 'angulartics.google.analytics', 'ui.bootstrap', 'ui.router','ngResource', 'authModule', 'homeModule', 'userModule', 'defendantModule', 'clientModule', 'courtModule', 'caseModule', 'chart.js']);

//RouteScopes & Routes Configurations 
yousufalsharif.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'ChartJsProvider', function ($urlRouterProvider, $stateProvider, $locationProvider, ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
    	responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
    	datasetFill: false,
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
		.state('admin', {
			url: '/admin',
			templateUrl: 'public/modules/admin/view/index.admin.view.html',
			controller: 'indexAdminController',
			cache: false
		})
		.state('admin.users', {
			url: '/users',
			templateUrl: 'public/modules/admin/view/users.admin.view.html',
			controller: 'usersAdminController',
			cache: false
		})
		.state('admin.consultants', {
			url: '/consultants',
			templateUrl: 'public/modules/admin/view/consultants.admin.view.html',
			controller: 'consultantsAdminController'
		})
		.state('admin.employees', {
			url: '/employees',
			templateUrl: 'public/modules/admin/view/employees.admin.view.html',
			controller: 'employeesAdminController'
		})
		.state('admin.clients', {
			url: '/clients',
			templateUrl: 'public/modules/admin/view/clients.admin.view.html',
			controller: 'clientsAdminController',
			cache: false
		})
		.state('admin.cases', {
			url: '/cases',
			templateUrl: 'public/modules/admin/view/cases.admin.view.html',
			controller: 'casesAdminController',
			cache: false
		})
		.state('admin.courts', {
			url: '/courts',
			templateUrl: 'public/modules/admin/view/courts.admin.view.html',
			controller: 'courtsAdminController',
			cache: false
		});
		$locationProvider.html5Mode(true).hashPrefix('!');
}])
.run(['$rootScope', '$location', 'editableOptions', '$state', function ($rootScope, $location, editableOptions, $state) {
	editableOptions.theme = 'bs3';
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

	$rootScope.logged = false;
	$rootScope.lastPage = '';
}]);