'use strict';

angular.module('adminModule', []);
'use strict';

angular.module('calendarModule', []);
'use strict';

angular.module('caseModule', []);
'use strict';

angular.module('authModule', []);
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
			templateUrl: 'public/modules/admin/view/index.admin.view.html'
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
			templateUrl: 'public/modules/employee/view/index.employee.view.html',
			controller: 'indexEmployeeController'
		})
		.state('employee.sessions', {
			url: '/sessions',
			templateUrl: 'public/modules/case/view/sessions.case.view.html',
			controller: 'sessionsCaseController',
			cache: false
		})
		.state('employee.cases', {
			url: '/cases',
			templateUrl: 'public/modules/case/view/index.case.view.html',
			controller: 'indexCaseController',
			cache: false
		})
		.state('employee.tasks', {
			url: '/tasks',
			templateUrl: 'public/modules/calendar/view/index.calendar.view.html',
			controller: 'indexCalendarController',
			cache: false
		})
		.state('consultant', {
			url: '/consultant',
			templateUrl: 'public/modules/consultant/view/index.consultant.view.html',
			controller: 'indexConsultantController',
			cache: false
		})
		.state('consultant.memos', {
			url: '/memos',
			templateUrl: 'public/modules/case/view/memos.case.view.html',
			controller: 'memosCaseController',
			cache: false
		})
		.state('consultant.tasks', {
			url: '/tasks',
			templateUrl: 'public/modules/calendar/view/index.calendar.view.html',
			controller: 'indexCalendarController',
			cache: false
		})
		.state('consultant.sessions', {
			url: '/sessions',
			templateUrl: 'public/modules/case/view/sessions.case.view.html',
			controller: 'sessionsCaseController',
			cache: false
		})
		.state('consultant.cases', {
			url: '/cases',
			templateUrl: 'public/modules/case/view/index.case.view.html',
			controller: 'indexCaseController',
			cache: false
		})
		.state('client', {
			url: '/client',
			templateUrl: 'public/modules/client/view/dashboard.client.view.html',
			controller: 'dashboardClientController',
			cache: false
		})
		.state('client.case', {
			url: '/case',
			templateUrl: 'public/modules/case/view/index.case.view.html',
			controller: 'indexCaseController',
			cache: false
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
		$state.go('home', {}, {reload: true});
	}

	$rootScope.logged = false;
	$rootScope.lastPage = '';
}]);
'use strict';

angular.module('consultantModule', []);
'use strict';

angular.module('clientModule', []);
'use strict';

angular.module('caseRoleModule', []);
'use strict';

angular.module('courtModule', []);
'use strict';

angular.module('caseTypeModule', []);
'use strict';

angular.module('defendantModule', []);
'use strict';

angular.module('employeeModule', []);
'user strict';

angular.module('homeModule', []);
'use strict';

angular.module('reportModule', []);
'use strict';

angular.module('updateTypesModule', []);
'use strict';

angular.module('timelineModule', []);
'use strict';

angular.module('uploadModule', []);
'user strict';

angular.module('userModule', []);
'use strict';

angular.module('adminModule').controller('caseRoleAdminController', ['$scope', 'connectCaseRoleFactory', '$modal', 'socketConfigFactory', function ($scope, connectCaseRoleFactory, $modal, socketConfigFactory) {
	var getCaseRoles = function () {
		connectCaseRoleFactory.query({}, function(response){
			$scope.caseRoles = response;
		}, function(error){
			$scope.error = error.data.message;
		});		
	}

	//init caseroles
	getCaseRoles();

	//listen to caseRoles add
	socketConfigFactory.on('caseRoles.role.add', function (response) {
		$scope.caseRoles.push(response);
	});

	//listen to caseRoles update
	socketConfigFactory.on('caseRoles.role.update', function (response) {
		getCaseRoles();
	});

	$scope.showNewCaseRoleForm = function(){
		$modal.open({
			templateUrl: 'public/modules/caserole/view/create.caserole.view.html',
			controller: 'indexCaseRoleController',
			backdrop : 'static',
			resolve: {
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	$scope.removeCaseRole = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'caseRoles', 'index', function($scope, $modalInstance, id, caseRoles, index){
				$scope.message = {};
				$scope.message.title = 'حذف صفة';
				$scope.message.text = ' هل ترغب بحذف الصفة ' + caseRoles[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseRoleFactory.delete({'id': id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				caseRoles: function () {
					return $scope.caseRoles;
				},
				index: function(){
					return index;
				}
			}
		});



	}

}]);

'use strict';

angular.module('adminModule').controller('caseTypeAdminController', ['$scope', '$modal', 'connectCaseTypeFactory', 'socketConfigFactory', function ($scope, $modal, connectCaseTypeFactory, socketConfigFactory) {
	var getCaseTypes = function () {
		connectCaseTypeFactory.query({}, function(response){
			$scope.caseTypes = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	//init getCaseTypes
	getCaseTypes();

	//listen to add
	socketConfigFactory.on('caseType.add', function (response) {
		$scope.caseTypes.push(response);
	});

	//listen to update
	socketConfigFactory.on('caseType.update', function (response) {
		getCaseTypes();
	});

	$scope.showNewCaseTypeForm = function () {
		$modal.open({
			templateUrl: 'public/modules/casetypes/view/create.casetype.view.html',
			controller: 'indexCaseTypeController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				caseTypes: function(){
					return $scope.caseTypes;
				}
			}
		});
	}

	$scope.removeCaseType = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'caseTypes', 'index', function($scope, $modalInstance, id, caseTypes, index){
				$scope.message = {};
				$scope.message.title = 'حذف نوع قضية';
				$scope.message.text = ' هل ترغب بحذف نوع القضية ' + caseTypes[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseTypeFactory.delete({'id': id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				caseTypes: function () {
					return $scope.caseTypes;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);
'use strict';

angular.module('adminModule').controller('courtsAdminController', ['$scope', 'connectAdminFactory', '$state', '$modal', 'socketConfigFactory', function ($scope, connectAdminFactory, $state, $modal, socketConfigFactory) {
	var getCourts = function () {
		connectAdminFactory.query({page: 'court'}, function(response){
			$scope.courts = response;
		});
	}

	//init getCourts
	getCourts();


	//listen to court add
	socketConfigFactory.on('court.add', function (response) {
		$scope.courts.push(response);
	});

	//listen to court add
	socketConfigFactory.on('court.update', function (response) {
		getCourts();
	});

	$scope.showNewCourtForm = function(){
		$modal.open({
			templateUrl: 'public/modules/court/view/create.court.view.html',
			controller: 'indexCourtController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				courts: function(){
					return $scope.courts;
				}
			}
		});
	}

	$scope.removeCourtInfo = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'courts', 'index', function($scope, $modalInstance, id, courts, index){
				$scope.message = {};
				$scope.message.title = 'حذف محكمة';
				$scope.message.text = ' هل ترغب بحذف ' + courts[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectAdminFactory.delete({page: 'court', param: id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = response.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				courts: function () {
					return $scope.courts;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);
'use strict';

angular.module('adminModule').controller('defendantAdminController', ['$scope', 'connectDefendantFactory', '$http', '$modal', 'socketConfigFactory', 'helperConfigFactory', function ($scope, connectDefendantFactory, $http, $modal, socketConfigFactory, helperConfigFactory) {
	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	//listen to defendant add
	socketConfigFactory.on('defendant.add', function (response) {
		$scope.defendants.push(response);
	});

	//listen to defendant update
	socketConfigFactory.on('defendant.update', function (response) {
		var getIndex = helperConfigFactory.map($scope.defendants, function (defendant) {
			if(defendant._id.toString() == response._id.toString()){
				return true;
			}
		});
		if(getIndex){
			$scope.defendants[getIndex] = response;
		}
	});

	$scope.removeDefendant = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'defendants', 'index', function($scope, $modalInstance, id, defendants, index){
				$scope.message = {};
				$scope.message.title = 'حذف خصم';
				$scope.message.text = ' هل ترغب بحذف الخصم ' + defendants[index].firstName  + ' ' + defendants[index].lastName  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectDefendantFactory.delete({'id': id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				defendants: function () {
					return $scope.defendants;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);
'use strict';

angular.module('adminModule').controller('indexAdminController', ['$scope', '$state', 'registerUserConfigFactory', function ($scope, $state, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();

	
}]);
'use strict';

angular.module('adminModule').controller('settingsAdminController', ['$scope', '$state', function ($scope, $state) {
	//startup page
	$state.go('admin.settings.courts');
}]);
'use strict';

angular.module('adminModule').controller('updateTypesAdminController', ['$scope', '$modal', 'connectUpdateTypeFactory', 'socketConfigFactory', function ($scope, $modal, connectUpdateTypeFactory, socketConfigFactory) {
	var getUpdateType = function () {
		connectUpdateTypeFactory.query({}, function(response){
			$scope.updatetypes = response;
		}, function(error){
			$scope.error = error.data.message;
		});	
	}

	//init getUpdateType
	getUpdateType();

	//listen to update
	socketConfigFactory.on('updateType.update.add', function (response) {
		$scope.updatetypes.push(response);
	});

	//listen to update
	socketConfigFactory.on('updateType.update.update', function (response) {
		getUpdateType();
	});

	$scope.showNewUpdateForm = function(){
		$modal.open({
			templateUrl: 'public/modules/updatetypes/view/create.update.types.view.html',
			controller: 'indexUpdateTypesController',
			size: 'sm',
			backdrop: 'static',
			resolve: {
				updatetypes: function(){
					return $scope.updatetypes;
				}
			}
		});
	}

	$scope.removeUpdatetypes = function(index, id){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'updatetypes', 'index', function($scope, $modalInstance, id, updatetypes, index){
				$scope.message = {};
				$scope.message.title = 'حذف نوع تحديث';
				$scope.message.text = ' هل ترغب بحذف نوع التحديث ' + updatetypes[index].name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectUpdateTypeFactory.delete({'id': id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				updatetypes: function () {
					return $scope.updatetypes;
				},
				index: function(){
					return index;
				}
			}
		});
	}

}]);
'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', '$modal', 'connectAdminFactory', '$http', 'limitToFilter', 'socketConfigFactory', 'helperConfigFactory', function ($scope, $state, connectUserFactory, $modal, connectAdminFactory, $http, limitToFilter, socketConfigFactory, helperConfigFactory) {

	//make the clicked link active
	function activeSubNav(link){
		//first make all links unactive
		$scope.activeLinkArray = [];
		$scope.activeLinkArray['client'] = '';
		$scope.activeLinkArray['employee'] = '';
		$scope.activeLinkArray['consultant'] = '';
		$scope.activeLinkArray['all'] = '';
		//then active the clicked link
		$scope.activeLinkArray[link] = 'active';
	}


	//listen to user add
	socketConfigFactory.on('user.add', function (response) {
		$scope.users.push(response);
	});

	//listen to user update
	socketConfigFactory.on('user.update', function (response) {
		var getIndex = helperConfigFactory.map($scope.users, function (user) {
			if(response._id.toString() == user._id.toString()){
				return true;
			}
		});
		if(getIndex){
			$scope.users[getIndex] = response;
		}
	});


	$scope.searchResult = function(val){
	    return $http.get('/api/v1/user/search/' + val).then(function(response){
	    	return limitToFilter(response.data, 15);
	    });	
	}

	$scope.updateSearch = function(){
		if($scope.searchPhrase){
			$scope.searchResult();
		}
	}

	//when selecting a row in search results
	$scope.onSelect = function ($item, $model, $label) {
		$scope.users = [$item];
	}

	$scope.getAll = function(){
		activeSubNav('all');
		connectUserFactory.query({}, function(response){
			$scope.users = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.getClients = function(){
		activeSubNav('client');
		connectAdminFactory.query({page: 'client'}, function(response){
			$scope.users = response;
		});
	}

	$scope.getConsultants = function(){
		activeSubNav('consultant');
		connectAdminFactory.query({page: 'consultant'}, function(response){
			$scope.users = response;
		});
	}

	$scope.getEmployees = function(){
		activeSubNav('employee');
		connectAdminFactory.query({page: 'employee', action: 'nonlegal'}, function(response){
			$scope.users = response;
		});
	}

	//init getAll
	$scope.getAll();

	$scope.removeUserInfo = function(index, userId){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'userId', 'users', 'index', function($scope, $modalInstance, userId, users, index){
				$scope.message = {};
				$scope.message.title = 'حذف مستخدم';
				$scope.message.text = ' هل ترغب بحذف المستخدم ' + users[index].firstName  + ' ' + users[index].lastName  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectUserFactory.delete({'id': userId}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = response.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				userId: function(){
					return userId;
				},
				users: function () {
					return $scope.users;
				},
				index: function(){
					return index;
				}
			}
		});
	}

	$scope.showNewUserForm = function(){
		$modal.open({
			templateUrl: 'public/modules/user/view/create.user.view.html',
			controller: 'indexUserController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				users: function(){
					return $scope.users;
				}
			}
		});
	}

}]);
'use strict';

angular.module('adminModule').directive('lineChartAdminDirective', ['$q', '$modal', 'connectAdminFactory', function ($q, $modal, connectAdminFactory) {
	 return {
		require: '?ngModel',
		restrict: 'A',
		templateUrl: '/public/modules/admin/view/linechart/linechart.admin.directive.view.html',
		replace: true,
		link: function (scope, elem, attrs, ngModel) {
			function getLineChartAnalysis (dateFrom) {
				$q.all([
					connectAdminFactory.get({page: 'analysis', action: 'products', param: dateFrom}).$promise,
					connectAdminFactory.get({page: 'analysis', action: 'comments', param: dateFrom}).$promise,
					connectAdminFactory.get({page: 'analysis', action: 'hearts', param: dateFrom}).$promise,
					connectAdminFactory.get({page: 'analysis', action: 'orders', param: dateFrom}).$promise,
					connectAdminFactory.get({page: 'analysis', action: 'carts', param: dateFrom}).$promise,
					connectAdminFactory.get({page: 'analysis', action: 'users', param: dateFrom}).$promise
				]).then(function (result) {
					scope.lineData = [
						result[0].dataPoints,
						result[1].dataPoints,
						result[2].dataPoints,
						result[3].dataPoints,
						result[4].dataPoints,
						result[5].dataPoints
					]

					scope.data = [
						result[0].data,
						result[1].data,
						result[2].data,
						result[3].data,
						result[4].data,
						result[5].data
					]

					scope.lineLabels = result[0].fullDate;
					scope.dateFrom = new Date(scope.lineLabels[0]);
				}, function (err) {
					console.log(err);
				});

				scope.lineLabels = ["January", "February", "March", "April", "May", "June", "July"];
				scope.lineSeries = ['Products', 'Comments', 'Hearts', 'Orders', 'Carts', 'Users'];
				scope.lineData = [
					[],
					[],
					[],
					[],
					[],
					[]
				];
			}

			scope.getPointInfo = function (points, evt) {
				var pointer = scope.lineLabels.indexOf(points[0].label);
				scope.pointerInfo = {
					'date': points[0].label,
					'Products': scope.data[0][pointer],
					'ProductsColor': points[0].strokeColor,
					'Comments': scope.data[1][pointer],
					'CommentsColor': points[1].strokeColor,
					'Hearts': scope.data[2][pointer],
					'HeartsColor': points[2].strokeColor,
					'Orders': scope.data[3][pointer],
					'OrdersColor': points[3].strokeColor,
					'Carts': scope.data[4][pointer],
					'CartsColor': points[4].strokeColor,
					'Users': scope.data[5][pointer],
					'UsersColor': points[5].strokeColor
				}
			}

			scope.showProducts = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/products.linechart.admin.directive.view.html',
					size: 'lg',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Products;
					}]
				});	
			}
			scope.showComments = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/comments.linechart.admin.directive.view.html',
					size: 'lg',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Comments;
					}]
				});	
			}
			scope.showHearts = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/hearts.linechart.admin.directive.view.html',
					size: 'lg',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Hearts;
					}]
				});	
			}
			scope.showOrders = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/orders.linechart.admin.directive.view.html',
					size: 'md',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Orders;
						console.log($scope.info);
					}]
				});	
			}
			scope.showCarts = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/carts.linechart.admin.directive.view.html',
					size: 'md',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Carts;
					}]
				});	
			}
			scope.showUsers = function (point) {
				$modal.open({
					templateUrl: '/public/modules/admin/view/linechart/users.linechart.admin.directive.view.html',
					size: 'sm',
					controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
						$scope.info = scope.pointerInfo.Users;
					}]
				});	
			}

			//initilize the line chart
			getLineChartAnalysis();

			scope.getAnalysisButtton = function () {
				getLineChartAnalysis(scope.dateFrom);
			}
		}
	}
}]);
'user strict';

angular.module('adminModule').directive('userInteractionAdminDirective', ['connectAdminFactory', function (connectAdminFactory) {
	return {
		require: '?ngModel',
		restrict: 'A',
		templateUrl: '/public/modules/admin/view/user.interaction.admin.directive.view.html',
		replace: true,
		link: function (scope, elem, attrs, ngModel) {
			connectAdminFactory.get({page: 'analysis', action: 'indepthanalysis'}, function (response) {
				scope.pieLabels = ["User has order", "User has product", "User has cart", "User has comment", "User has heart", "User with no product or order"];
				scope.pieData = [response.hasOrderCount, response.hasProductCount, response.userHasCartCount, response.userHasCommentCount, response.userHasHeartCount, response.hasNoProductOrOrderCount];
			});
		}
	}
}]);
'use strict';

angular.module('adminModule').factory('connectAdminFactory', ['$resource', function ($resource) {
	return $resource('api/v1/admin/:page/:action/:id/:param/:limit/:skip/:from/:to', 
		{
			"page": "@page",
			"action": "@action",
			"param": "@param",
			"limit": "@limit",
			"skip": "@skip",
			"from": "@from",
			"to": "@to"
		}, 
		{ 
		'update': { method:'PUT' }
	});
}]);
'use strict';

angular.module('calendarModule').controller('actionsCalendarController', ['$scope', '$modalInstance', 'user', 'task', '$modal', 'remarks', function ($scope, $modalInstance, user, task, $modal, remarks) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.task = task;
	$scope.user = user;

	$scope.isAuthor = (user._id == task.user._id)? true: false;
	$scope.isResponsibility = (user._id == task.responsibility._id)? true: false;

	var inlineConfirmMsg = '<div class="row"><div class="col-md-12"><h5 ng-bind="msg"></h5></div><div class="col-md-12"><button class="btn btn-sm btn-block" ng-class="{\'btn-danger\': isWarning == true, \'btn-success\': isWarning == false }" ng-click="confrimYes()">نعم</button></div><div class="col-md-12"><button class="btn btn-sm btn-block" ng-class="{\'btn-success\': isWarning == true, \'btn-danger\': isWarning == false }" ng-click="confrimNo()">لا</button></div></div>';


	$scope.markDoneConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending') && ($scope.remarks)){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', 'remarks', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance, remarks){
					$scope.isWarning = false;
					$scope.msg = 'هل ترغب بتأكيد الإنتهاء من المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.save({'id': task._id, 'subaction': 'done'}, {'remarks': remarks}, function(response){
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					},
					remarks: function () {
						return $scope.remarks;
					}
				}
			});
		}
	}

	$scope.softRemoveConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending') && ($scope.remarks)){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', 'remarks', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance, remarks){
					$scope.isWarning = true;
					$scope.msg = 'هل ترغب بحذف المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.save({'id': task._id, 'subaction': 'softRemove'}, {'remarks': remarks}, function(response){
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					},
					remarks: function () {
						return $scope.remarks;
					}
				}
			});
		}
	}

	$scope.markRejectedConfirm = function(){
		if(($scope.task.removed === false) && ($scope.task.rejected === false) && ($scope.task.status == 'pending') && ($scope.remarks)){
			$modal.open({
				template: inlineConfirmMsg,
				controller: ['$scope', '$modalInstance', 'connectCalendarFactory', 'task', 'parentModalInstance', 'remarks', function($scope, $modalInstance, connectCalendarFactory, task, parentModalInstance, remarks){
					$scope.isWarning = true;
					$scope.msg = 'هل ترغب بتأكيد رفض المهمة';

					$scope.confrimYes = function(){
						connectCalendarFactory.save({'id': task._id, 'subaction': 'reject'}, {'remarks': remarks}, function(response){
							$modalInstance.dismiss('cancel');
							parentModalInstance.dismiss('cancel');
						}, function(error){
							$scope.error = error.data.message;
						});
					}

					$scope.confrimNo = function(){
						$modalInstance.dismiss('cancel');
					}
				}],
				size: 'sm',
				backdrop: 'static',
				resolve: {
					task: function(){
						return $scope.task;
					},
					parentModalInstance: function(){
						return $modalInstance;
					},
					remarks: function () {
						return $scope.remarks;
					}
				}
			});
		}
	}


}]);
'use strict';

angular.module('calendarModule').controller('createTaskCalendarController', ['$scope', '$modalInstance', 'connectCalendarFactory', 'connectUserFactory', 'tasks', 'user', function ($scope, $modalInstance, connectCalendarFactory, connectUserFactory, tasks, user) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	connectUserFactory.query({'action': 'available'}, function(response){
		//only the admin can assign tasks to other users and him/her self
		//other users can only assign tasks to themselves
		if(user.role !== 'admin'){
			$scope.users = [user];
		} else {
			$scope.users = response;
			$scope.users.push(user);
		}
	});

	$scope.createNewTask = function(){
		//get the selected user from users by index
		$scope.info.responsibility = $scope.users[$scope.info.responsibilityIndex]._id;
		connectCalendarFactory.save({}, {'info': $scope.info}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			console.log(error);
		});
	}
}]);
'use strict';

angular.module('calendarModule').controller('indexCalendarController', ['$scope', 'connectCalendarFactory', '$modal', 'registerUserConfigFactory', '$filter', 'socketConfigFactory', 'helperConfigFactory', function ($scope, connectCalendarFactory, $modal, registerUserConfigFactory, $filter, socketConfigFactory, helperConfigFactory) {
	//init scope, for some reason if we update the tasks later and if we did not init this it wont update!
	$scope.tasks = [];

	connectCalendarFactory.query({}, function(response){
		$scope.tasks = response;
	});

	//listen to tasks
	socketConfigFactory.on('tasks.add', function (task) {
		var activeStatus = getActiveStatus();
		if(activeStatus == 'pending'){
			$scope.memosPending();
		} else if(activeStatus == 'close'){
			$scope.memosClosed();
		} else {
			$scope.memosAll();
		}
	});

	//listen to tasks
	socketConfigFactory.on('tasks.update', function (task) {
		var activeStatus = getActiveStatus();
		if(activeStatus == 'pending'){
			$scope.memosPending();
		} else if(activeStatus == 'close'){
			$scope.memosClosed();
		} else {
			$scope.memosAll();
		}
	});


	$scope.user = registerUserConfigFactory.getUser();

	$scope.isTodayOrMissed = function (deadline) {
		var deadline = new Date(deadline);
		var today = new Date();
		deadline.setHours(0,0,0,0);
		today.setHours(0,0,0,0);
		var check = (deadline.getTime() <= today.getTime())? true: false;
		return check;
	}

	$scope.memosAll = function () {
		connectCalendarFactory.query({}, function(response){
			$scope.tasks = response;
		});
		activeStatus('all');
	}

	$scope.memosClosed = function () {
		connectCalendarFactory.query({'action': 'close'}, function(response){
			$scope.tasks = response;
		});
		activeStatus('close');
	}

	$scope.memosPending = function () {
		connectCalendarFactory.query({'action': 'pending'}, function(response){
			$scope.tasks = response;
		});
		activeStatus('pending');
	}

	var activeStatus = function (value) {
		switch(value){
			case 'close':
				$scope.activeClosed = 'active';
				$scope.activePending = '';
				$scope.activeAll = '';
				break;
			case 'pending':
				$scope.activeClosed = '';
				$scope.activePending = 'active';
				$scope.activeAll = '';
				break;
			case 'all':
			case 'default':
				$scope.activeClosed = '';
				$scope.activePending = '';
				$scope.activeAll = 'active';
		}
	}

	var getActiveStatus = function () {
		if($scope.activeClosed == 'active'){
			return 'close';
		} else if($scope.activePending == 'active'){
			return 'pending';
		} else {
			return 'all';
		}
	}

	//init active status
	activeStatus('all');

	$scope.showNewTaskForm = function(){
		$modal.open({
			templateUrl: 'public/modules/calendar/view/create.task.calendar.view.html',
			controller: 'createTaskCalendarController',
			backdrop: 'static',
			resolve: {
				tasks: function(){
					return $scope.tasks;
				},
				user: function () {
					return $scope.user;
				}
			}
		});
	}

	$scope.showTaskActions = function(index){
		if(($scope.tasks[index].removed === false) && ($scope.tasks[index].rejected === false) && ($scope.tasks[index].status == 'pending') && (($scope.tasks[index].responsibility._id == $scope.user._id) ||  ($scope.tasks[index].user._id == $scope.user._id))){
			$modal.open({
				templateUrl: 'public/modules/calendar/view/actions.calander.view.html',
				controller: 'actionsCalendarController',
				backdrop: 'static',
				size: 'sm',
				resolve: {
					task: function(){
						return $scope.tasks[index];
					},
					user: function(){
						return $scope.user;
					},
					remarks: function () {
						return $scope.remarks;
					}
				}
			});
		}
	}
}]);
'use strict';

angular.module('calendarModule').factory('connectCalendarFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/calendar/:action/:id/:subaction');
}]);
'use strict';

angular.module('caseModule').controller('createCaseController', ['$scope', 'cases', 'connectAdminFactory', '$modal', '$modalInstance', 'connectDefendantFactory', 'connectCaseRoleFactory', 'connectCaseFactory', 'connectCaseTypeFactory', 'socketConfigFactory', function ($scope, cases, connectAdminFactory, $modal, $modalInstance, connectDefendantFactory, connectCaseRoleFactory, connectCaseFactory, connectCaseTypeFactory, socketConfigFactory) {

	var getCaseTypes = function () {
		connectCaseTypeFactory.query({'action': 'available'}, function(response){
			$scope.caseTypes = response;
		});
	}

	var getCourts = function () {
		connectAdminFactory.query({page: 'court', action: 'available'}, function(response){
			$scope.courts = response;
		});
	}

	var getCaseRoles = function () {
		connectCaseRoleFactory.query({action: 'available'}, function(response){
			$scope.caseRoles = response;
		});
	}

	var getClients = function () {
		connectAdminFactory.query({page: 'client', action: 'available'}, function(response){
			$scope.clients = response;
		});		
	}

	var getConsultants = function () {
		connectAdminFactory.query({page: 'consultant', action: 'available'}, function(response){
			$scope.consultants = response;
		});		
	}

	var getDefendants = function () {
		connectDefendantFactory.query({'action': 'available'}, function(response){
			$scope.defendants = response;
		});		
	}

	//init
	$scope.newCase = {};
	$scope.selectedClients = [];
	$scope.selectedDefendants = [];

	getCaseTypes();
	getCourts();
	getCaseRoles();
	getClients();
	getConsultants();
	getDefendants();


	//listen to adds and updates
	//listen to caseRoles add
	socketConfigFactory.on('caseRoles.available.add', function (response) {
		$scope.caseRoles.push(response);
	});
	//listen to caseRoles update
	socketConfigFactory.on('caseRoles.available.update', function (response) {
		getCaseRoles();
	});
	//listen to add
	socketConfigFactory.on('caseType.available.add', function (response) {
		$scope.caseTypes.push(response);
	});
	//listen to update
	socketConfigFactory.on('caseType.available.update', function (response) {
		getCaseTypes();
	});
	//listen to court add
	socketConfigFactory.on('court.available.add', function (response) {
		$scope.courts.push(response);
	});
	//listen to court add
	socketConfigFactory.on('court.available.update', function (response) {
		getCourts();
	});


	//show selected "step"
	$scope.step = function(num){
		switch(num){
			case 1:
				$scope.pageTitle = 'البلاغ';
				$scope.step1 = true;
				$scope.step2 = false;
				$scope.step3 = false;
				$scope.step4 = false;
				break;
			case 2:
				$scope.pageTitle = 'الموكلين';
				$scope.step1 = false;
				$scope.step2 = true;
				$scope.step3 = false;
				$scope.step4 = false;
				break;
			case 3:
				$scope.pageTitle = 'الخصوم';
				$scope.step1 = false;
				$scope.step2 = false;
				$scope.step3 = true;
				$scope.step4 = false;
				break;
			case 4:
				$scope.pageTitle = 'الوقائع';
				$scope.step1 = false;
				$scope.step2 = false;
				$scope.step3 = false;
				$scope.step4 = true;
				break;
		}
	}

	//init with step 1
	$scope.step(1);

	$scope.compeleteToProceedStep1 = function(){
		if(!$scope.newCase.caseType || !$scope.newCase.caseDate || !$scope.newCase.caseNumber || !$scope.newCase.court) return true;
		return false;
	}

	$scope.compeleteToProceedStep2 = function(){
		if($scope.selectedClients.length === 0) return true;
		return false;
	}

	$scope.compeleteToProceedStep3 = function(){
		if($scope.selectedDefendants.length === 0) return true;
		return false;
	}

	$scope.compeleteToProceedStep4 = function(){
		if(!$scope.newCase.consultant || !$scope.newCase.subject || !$scope.newCase.facts) return true;
		return false;
	}



	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.selectClient = function(){
		if($scope.newCase.client){
			$scope.selectedClients.push(angular.copy($scope.clients[$scope.newCase.client]));
			$scope.clients.splice($scope.newCase.client, 1);
			$scope.newCase.client = '';
		}
	}

	$scope.removeSelectedClient = function(index){
		$scope.clients.push(angular.copy($scope.selectedClients[index]));
		$scope.selectedClients.splice(index, 1);
	}

	$scope.showNewClientForm = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/create.client.view.html',
			controller: 'indexClientController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				clients: function(){
					return $scope.clients
				},
				selectedClients: function(){
					return $scope.selectedClients;
				},
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	$scope.selectDefendant = function(){
		if($scope.newCase.defendant){
			$scope.selectedDefendants.push(angular.copy($scope.defendants[$scope.newCase.defendant]));
			$scope.defendants.splice($scope.newCase.defendant, 1);
			$scope.newCase.defendant = '';
		}
	}

	$scope.removeSelectedDefendant = function(index, id){
		$scope.defendants.push(angular.copy($scope.selectedDefendants[index]));
		$scope.selectedDefendants.splice(index, 1);
	}

	$scope.showNewDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/create.defendant.view.html',
			controller: 'indexDefendantController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				defendants: function(){
					return $scope.defendants
				},
				selectedDefendants: function(){
					return $scope.selectedDefendants;
				},
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	//get ids in objects array
	var getIds = function(IDs){
		var allIds = [];
		IDs.forEach(function(info){
			allIds.push(info._id);
		});
		return allIds;
	}

	//get ids and roles in objects array
	var getIdsAndRoles = function(usersInfo){
		var allIds = [];
		usersInfo.forEach(function(info){
			allIds.push({
				user: info._id,
				role: info.caseRole
			});
		});
		return allIds;
	}

	$scope.createNewCase = function(){
		$scope.error = false;
		var caseInfo = {
			caseType: $scope.newCase.caseType,
			defendant: getIdsAndRoles($scope.selectedDefendants),
			client: getIdsAndRoles($scope.selectedClients),
			caseDate: $scope.newCase.caseDate,
			court: $scope.newCase.court,
			reportNumber: $scope.newCase.reportNumber,
			caseNumber: $scope.newCase.caseNumber,
			subject: $scope.newCase.subject,
			facts: $scope.newCase.facts,
			consultant: $scope.consultants[$scope.newCase.consultant]._id,
			status: 'open'
		}

		connectCaseFactory.save({}, {'caseInfo': caseInfo}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});

	}

}]);
'use strict';

angular.module('caseModule').controller('detailsCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', '$modal', 'user', 'socketConfigFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, $modal, user, socketConfigFactory) {
	$scope.selectedCase = selectedCase;
	$scope.user = user;

	//listen to update
	socketConfigFactory.on('cases.update', function (caseInfo) {
		$scope.selectedCase = caseInfo;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.showNextSession = function(){
		if($scope.selectedCase.sessions){
			return true;
		}
		return false;
	}

	$scope.showUpdateCase = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/update.case.view.html',
			controller: 'updateCaseController',
			backdrop: 'static',
			size: 'md',
			resolve: {
				selectedCase: function(){
					return selectedCase;
				}
			}
		});
	}

	$scope.showAddClientSwitch = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/switch.client.view.html',
			controller: 'switchClientController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showAddDefendantSwitch = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/switch.defendant.view.html',
			controller: 'switchDefendantController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showRemoveClientConfirmForm = function(index){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'client', 'selectedCase', function($scope, $modalInstance, client, selectedCase){
				$scope.message = {};
				$scope.message.title = 'حذف موكل';
				$scope.message.text = ' هل ترغب بحذف الموكل ' + client.user.firstName + ' ' + ' ' + client.user.lastName + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({'caseId': selectedCase._id, 'action': 'client', 'id': client._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				client: function(){
					return $scope.selectedCase.client[index];
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showRemoveDefendantConfirmForm = function(index){
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'defendant', 'selectedCase', function($scope, $modalInstance, defendant, selectedCase){
				$scope.message = {};
				$scope.message.title = 'حذف موكل';
				$scope.message.text = ' هل ترغب بحذف الخصم ' + defendant.user.firstName + ' ' + ' ' + defendant.user.lastName + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({'caseId': selectedCase._id, 'action': 'defendant', 'id': defendant._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				defendant: function(){
					return $scope.selectedCase.defendant[index];
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.showUploads = function(){
		$modal.open({
			controller: 'indexUploadController',
			templateUrl: 'public/modules/uploads/view/index.upload.view.html',
			backdrop: 'static',
			size: 'md',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

	$scope.softRemoveUpdate = function (index) {
		if(!index && index !== 0){ return; };
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance','selectedCase', '$filter', function($scope, $modalInstance, selectedCase, $filter){
				var updateDate = $filter('date')(selectedCase.updates[index].created, "dd/MM/yyyy");
				var updateIdNumber = (selectedCase.updates[index].updateId)? ' رقم ' + selectedCase.updates[index].updateId + ' ': '';
				$scope.message = {};
				$scope.message.title = 'حذف تحديث';
				$scope.message.text = 'هل ترغب بحذف : ' + selectedCase.updates[index].updateType + updateIdNumber + ' بتاريخ ' +  updateDate + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					var updateInfo = selectedCase.updates[index];
					connectCaseFactory.remove({'action': 'caseupdate', 'actionId': selectedCase._id, 'id': updateInfo._id}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = error;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}
}]);
'use strict';

angular.module('adminModule').controller('indexCaseController', ['$scope', 'connectCaseFactory', '$state', '$modal', 'registerUserConfigFactory', '$http', 'limitToFilter', 'socketConfigFactory', 'helperConfigFactory', function ($scope, connectCaseFactory, $state, $modal, registerUserConfigFactory, $http, limitToFilter, socketConfigFactory, helperConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');

	//scope dates
	$scope.searchInfo = {};

	//clients can see thier cases only
	if($scope.user.role !== 'client'){
		connectCaseFactory.query({}, function(response){
			$scope.cases = response;
		});
	} else {
		connectCaseFactory.query({'action': 'client'}, function(response){
			$scope.cases = response;
		});
	}

	//listen to add
	socketConfigFactory.on('cases.add', function (caseInfo) {
		$scope.cases.unshift(caseInfo);
	});
	//listen to update
	socketConfigFactory.on('cases.update', function (caseInfo) {
		var caseIndex = helperConfigFactory.map($scope.cases, function (item) {
			if(item._id.toString() == caseInfo._id.toString()){
				return true;
			}
		});
		$scope.cases[caseIndex] = caseInfo;
	});

	$scope.searchInOptions = ['client', 'defendant', 'consultant', 'case', 'update', 'session'];

	$scope.searchResult = function(val){
		var search = {};
		search.phrase = val;
		search.dateTo = $scope.searchInfo.searchDateFrom;
		search.dateFrom = $scope.searchInfo.searchDateTo;
		search.searchIn = $scope.searchInfo.searchIn || undefined;

	    return $http.post('/api/v1/case/search/', {"search": search}).then(function(response){
	    	return limitToFilter(response.data, 15);
	    });	
	}

	$scope.updateSearch = function(){
		if($scope.searchPhrase){
			$scope.searchResult();
		}
	}

	//when selecting a row in search results
	$scope.onSelect = function ($item, $model, $label) {
		$scope.cases = [$item];
	}

	$scope.clearSearchPhrase = function(){
		$scope.searchInfo.searchDateFrom = undefined;
		$scope.searchInfo.searchDateTo = undefined;
	}

	$scope.showNewCaseForm = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/create.case.view.html',
			controller: 'createCaseController',
			size: 'lg',
			backdrop : 'static',
			resolve: {
				cases: function(){
					return $scope.cases;
				}
			}
		});
	}

	$scope.showCaseDetails = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/details.case.view.html',
			controller: 'detailsCaseController',
			size: 'lg',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.cases[index];
				},
				user: function () {
					return $scope.user;
				}
			}
		});
	}

	$scope.removeCase = function (index, id) {
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'id', 'cases', 'index', '$filter', function($scope, $modalInstance, id, cases, index, $filter){
				var caseDate = $filter('date')(cases[index].caseDate, 'yyyy/MM/dd');

				$scope.message = {};
				$scope.message.title = 'حذف قضية';
				$scope.message.text = ' هل ترغب بحذف القضية ' + cases[index].caseType  + ' رقم ' + cases[index].caseNumber  + ' بتاريخ ' + caseDate + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.remove({caseId: id}, function(response){
						$modalInstance.dismiss('cancel');
					},function(error){
						$scope.error = error.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				id: function(){
					return id;
				},
				cases: function () {
					return $scope.cases;
				},
				index: function(){
					return index;
				}
			}
		});


	}

}]);
'use strict';

angular.module('caseModule').controller('memosCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', 'socketConfigFactory', function ($scope, connectCaseFactory, $modal, registerUserConfigFactory, socketConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;
	$scope.searchInfo = {};

	//listen to memo add
	socketConfigFactory.on('memos.add', function (memo) {
		if($scope.activePending == 'active' && memo.isOld == false){
			$scope.memos.unshift(memo.info);
		} else if($scope.activeClosed == 'active' && memo.isOld == true){
			$scope.memos.unshift(memo.info);
		}
	});

	//listen to memo update
	socketConfigFactory.on('memos.update', function (caseInfo) {
		if($scope.activePending == 'active'){
			$scope.memosPending();
		} else if($scope.activeClosed == 'active'){
			$scope.memosClosed();
		}
	});

	$scope.memosPending = function(){
		connectCaseFactory.query({'action': 'memos', 'subaction': 'pending'}, function(response){
			$scope.memos = response;
			$scope.activeClosed = '';
			$scope.activePending = 'active';
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.memosClosed = function(){
		connectCaseFactory.query({'action': 'memos', 'subaction': 'closed'}, function(response){
			$scope.memos = response;
			$scope.activeClosed = 'active';
			$scope.activePending = '';
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	//init with the pending memos
	$scope.memosPending();

	//case consultants is an array that contains all consultant that have been assigned to the case
	//as we can only assign one consultant to a case at a time then this means that we need the last one
	//to know the one is currently assigned to the case
	var getCaseLastConsultant = function (consultants) {
		if(consultants.length == 0) return false;
		return consultants[consultants.length - 1];		
	}

	$scope.fullName = function(consultants){
		var info = getCaseLastConsultant(consultants);
		if(!info) return '';
		return info.firstName + ' ' + info.lastName;
	}

	//check if the user is the consultant which the memo is assigned to
	$scope.isCaseConsultant = function (consultants) {
		var info = getCaseLastConsultant(consultants);
		if(!info) return '';
		return ($scope.user._id === info._id)? true: false;
	}

	$scope.showUpdateConsultantForm = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/update.consultant.case.view.html',
			controller: 'updateConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memos[index];
				}
			}
		});
	}

	$scope.showUploadedMemos = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/memos.consultant.case.view.html',
			controller: 'memoConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memos[index];
				}
			}
		});
	}

}]);
'use strict';


angular.module('caseModule').controller('memoConsultantCaseController', ['$scope', 'memoInfo', '$modalInstance', '$modal', 'socketConfigFactory', 'connectCaseFactory', function ($scope, memoInfo, $modalInstance, $modal, socketConfigFactory, connectCaseFactory) {
	var init = function () {
		connectCaseFactory.get({caseId: memoInfo.caseId, action: 'memos', actionId: memoInfo.updateId}, function (response) {
			$scope.memoInfo = response;
			//to get the consultant first name and last name
			var consultantInfo = $scope.memoInfo.memoConsultant[$scope.memoInfo.memoConsultant.length -1];
			$scope.consultant = consultantInfo.firstName + ' ' + consultantInfo.lastName;
			$scope.docs = $scope.memoInfo.memosUploaded;
		});
	}

	//get the memo info
	init();

	//listen to memo update
	socketConfigFactory.on('memos.update', function (memo) {
		init();
	});

	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	}

	$scope.downloadDoc = function(docId){
		return '/api/v1/case/' + $scope.memoInfo.caseId +'/download/' + docId;
	}

	$scope.showUploadMemoForm = function () {
		$modal.open({
			templateUrl: 'public/modules/case/view/upload.memo.consultant.case.view.html',
			controller: 'uploadMemoConsultantCaseController',
			backdrop: 'static',
			resolve: {
				memoInfo: function(){
					return $scope.memoInfo;
				}
			}
		});
	}
}]);
'use strict';

angular.module('caseModule').controller('sessionDetailsCaseController', ['$scope', '$modalInstance', 'sessionInfo', function ($scope, $modalInstance, sessionInfo) {
	$scope.sessionInfo = sessionInfo;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);
'use strict';

angular.module('caseModule').controller('sessionsCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', 'socketConfigFactory', 'helperConfigFactory', function($scope, connectCaseFactory, $modal, registerUserConfigFactory, socketConfigFactory, helperConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;

	//listen to session add
	socketConfigFactory.on('sessions.add', function (session) {
		if($scope.activeUpcoming == 'active' && session.isOld == false){
			$scope.sessions.unshift(session.info);
		} else if($scope.activePrevious == 'active' && session.isOld == true){
			$scope.sessions.unshift(session.info);
		}
	});

	//listen to session update
	socketConfigFactory.on('sessions.update', function (caseInfo) {
		if($scope.activeUpcoming == 'active'){
			$scope.upcoming();
		} else if($scope.activePrevious == 'active'){
			$scope.previous();
		}
	});


	$scope.highlight = function (sessionDate) {
		var today = new Date();
		var date = new Date(sessionDate);
		today.setHours(0,0,0,0);
		date.setHours(0,0,0,0);
		if(today.getTime() == date.getTime()){
			return true;
		} else {
			return false;
		}
	}


	$scope.upcoming = function(){
		connectCaseFactory.query({'action': 'sessions', 'subaction': 'upcoming'}, function(response){
			$scope.activePrevious = '';
			$scope.activeUpcoming = 'active';
			$scope.sessions = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.previous = function(){
		connectCaseFactory.query({'action': 'sessions', 'subaction': 'previous'}, function(response){
			$scope.activePrevious = 'active';
			$scope.activeUpcoming = '';
			$scope.sessions = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.sechedule = function(){
		$modal.open({
			templateUrl: 'public/modules/case/view/tasks.case.view.html',
			controller: 'tasksCaseController',
			size: 'lg',
			backdrop : 'static',
			resolve: {
				upcoming: function(){
					return $scope.upcoming;
				}
			}
		});
	}

	//init upcoming
	$scope.upcoming();

	$scope.showSessionDetails = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/session.details.case.view.html',
			controller: 'sessionDetailsCaseController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				sessionInfo: function(){
					return $scope.sessions[index];
				}
			}
		});
	}

}]);
'use strict';

angular.module('caseModule').controller('tasksCaseController', ['$scope', '$modalInstance', 'connectAdminFactory', 'connectCaseFactory', '$timeout', 'upcoming', function ($scope, $modalInstance, connectAdminFactory, connectCaseFactory, $timeout, upcoming) {
	$scope.closeModal = function () {
		$modalInstance.close('cancel');
	}

	var sysMsg = function(type, msg, dismiss){
		if(type == 'success'){
			$scope.success = msg;
			$scope.error = false;
		} else if(type == 'error'){
			$scope.error = msg;
			$scope.success = false;
		}

		var timer = $timeout(function(){
			$scope.success = false;
			$scope.error = false;
			$timeout.cancel(timer);
			if(dismiss){
				$modalInstance.close('cancel');
			}
		}, 1500);
	}

	$scope.radioModel = 'byDate';

	connectAdminFactory.query({page: 'court', 'action': 'available'}, function(response){
		$scope.courts = response;
	});

	connectAdminFactory.query({page: 'employee', 'action': 'available'}, function(response){
		$scope.employees = response;
	});

	connectCaseFactory.query({'action': 'available'}, function(response){
		$scope.cases = response;
	});

	$scope.updateTaskBydate = function(courtID, index){
		$scope.error = false;
		$scope.success = false;
		if(index){
			var info = {
				courtID: courtID,
				dateFrom: angular.copy($scope.updateTaskByDateFrom),
				dateTo: angular.copy($scope.updateTaskByDateTo),
				lawyerID: angular.copy($scope.employees[index]._id)
			}

			//empty fields
			$scope.selectedEmployeeIndex = '';
			$scope.updateTaskByDateFrom = '';
			$scope.updateTaskByDateTo = '';

			connectCaseFactory.save({'action': 'tasks', 'subaction': 'updatebydate'}, {'info': info}, function(response){
				sysMsg('success', response.message);
				//update the parent "sessions"
			}, function(error){
				sysMsg('error', error.data.message, true);
			});
		}
	}

	$scope.updateTaskbyCase = function(caseID, index){
		$scope.error = false;
		$scope.success = false;
		var info = {
			caseID: caseID,
			lawyerID: angular.copy($scope.employees[index]._id)
		}
		connectCaseFactory.save({'action': 'tasks', 'subaction': 'updatebycase'}, {'info': info}, function(response){
			sysMsg('success', response.message);
			//update the parent "sessions"
		}, function(error){
			sysMsg('error', error.data.message)
		});
	}

}]);
'use strict';

angular.module('caseModule').controller('updateCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', 'connectUpdateTypeFactory', 'connectCaseRoleFactory', 'socketConfigFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, connectUpdateTypeFactory, connectCaseRoleFactory, socketConfigFactory) {
	$scope.selectedCase = selectedCase;

	//init newDate
	$scope.newUpdate = {};
	$scope.newUpdate.session = {};

	var getUpdateType = function () {
		connectUpdateTypeFactory.query({'action': 'available'}, function(response){
			$scope.caseUpdates = response;
		}, function(error){
			$scope.error = error.data.message;
		});	
	}

	var getCaseRoles = function () {
		connectCaseRoleFactory.query({action: 'available'}, function(response){
			$scope.caseRoles = response;
		});
	}

	//inits
	getUpdateType();
	getCaseRoles();

	//listen to updateType add
	socketConfigFactory.on('updateType.availableUpdate.add', function (response) {
		$scope.caseUpdates.push(response);
	});

	//listen to updateType update
	socketConfigFactory.on('updateType.availableUpdate.update', function (response) {
		getUpdateType();
	});

	//listen to caseRoles add
	socketConfigFactory.on('caseRoles.available.add', function (response) {
		$scope.caseRoles.push(response);
	});

	//listen to caseRoles update
	socketConfigFactory.on('caseRoles.available.update', function (response) {
		getCaseRoles();
	});


	connectCaseFactory.query({action: 'updates', actionId: $scope.selectedCase._id, subaction: 'available'}, function (response) {
		$scope.caseUpdatesWithUpdateId = response;
	}, function(error){
		$scope.error = error.data.message;
	});


	//save the clients and the defendants current info
	$scope.udatedClientInfo = angular.copy(selectedCase.client);
	$scope.udatedDefendantInfo = angular.copy(selectedCase.defendant);

	$scope.updateclientNewRole = function(index, newRole){
		//make the new role the last role in the array
		//use this to avoid adding new roles everytime the user change the value
		//thats why push is not used
		$scope.udatedClientInfo[index].role[selectedCase.client[index].role.length] = newRole;
	}

	$scope.updateDefendantNewRole = function(index, newRole){
		//make the new role the last role in the array
		//use this to avoid adding new roles everytime the user change the value
		//thats why push is not used
		$scope.udatedDefendantInfo[index].role[selectedCase.defendant[index].role.length] = newRole;
	}

	$scope.updateOptions = function () {
		if(!$scope.caseUpdates[$scope.newUpdate.name]){ return {}; };
		return {
			'requiredId': $scope.caseUpdates[$scope.newUpdate.name].requiredId,
			'requireRoleUpdate': $scope.caseUpdates[$scope.newUpdate.name].requireRoleUpdate,
			'requiredIdTitle': $scope.caseUpdates[$scope.newUpdate.name].requiredIdTitle,
			'requireNextSession':$scope.caseUpdates[$scope.newUpdate.name].requireNextSession,
			'requireRemarks': $scope.caseUpdates[$scope.newUpdate.name].requireRemarks,
			'requestMemo': $scope.caseUpdates[$scope.newUpdate.name].requestMemo,
			'requireDeadline': $scope.caseUpdates[$scope.newUpdate.name].requireDeadline
		}
	}

	$scope.addNewCaseUpdate = function(){
		//the name in the 'caseUpdates' variable is the index!!! so we use
		//the following to get the real name through the array index
		//if a memo is required 'memoRequired' then make it true
		$scope.newUpdate.memoRequired = $scope.caseUpdates[$scope.newUpdate.name].requestMemo? true: false;
		$scope.newUpdate.sessionRequired = $scope.caseUpdates[$scope.newUpdate.name].requireNextSession? true: false;
		$scope.newUpdate.name = $scope.caseUpdates[$scope.newUpdate.name].name;
		//add the roles updates to the case update info
		$scope.newUpdate.clientInfo = $scope.udatedClientInfo;
		$scope.newUpdate.defendantInfo = $scope.udatedDefendantInfo;

		//if session is required
		if($scope.newUpdate.sessionRequired){
			if($scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex]){
				$scope.newUpdate.session.refType = $scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex].updateType;
				$scope.newUpdate.session.refNumber = $scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex].updateId;		
			}
		}

		//if memo is required
		//the memo deadline is passed through UI "deadline"
		if($scope.newUpdate.memoRequired){
			if($scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex]){
				$scope.newUpdate.memoId = $scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex].updateId;
				$scope.newUpdate.memoType = $scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex].updateType;
			}
		}

		connectCaseFactory.save({'action': 'caseupdate', 'id': selectedCase._id}, {'update': $scope.newUpdate}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.message;
		});
	}

	$scope.checkIfIdRequired = function(){
		var options = $scope.updateOptions();
		$scope.showRequireId =  options.requiredId || '';
		$scope.requireRoleUpdate =  options.requireRoleUpdate || '';
		$scope.showRequireIdTitle =  options.requiredIdTitle || '';
		$scope.showNextSessionBox =  options.requireNextSession || '';
		$scope.showRemarks =  options.requireRemarks || '';
		$scope.showMemoBox = options.requestMemo || '';
		$scope.showRequireDeadline = options.requireDeadline || '';
		//if the 'requireId' is empty then make it empty instead of false to avoid error
		//after the update , not sure if the following line is needed
		$scope.newUpdate.session.updateId = ($scope.showRequireId === false)? $scope.newUpdate.session.updateId: '';
	}

	$scope.isValid = function(){
		if($scope.newUpdate){
			if(!$scope.newUpdate.name){ return false; };
			var valid = true;
			var options = $scope.updateOptions();

			if(!options){ return false; };

			if(options.requiredId){
				if(!$scope.newUpdate.session.updateId){ valid = false; };
			}

			if(options.requestMemo){}

			if(options.requireRoleUpdate){}

			if(options.requiredIdTitle){}

			if(options.requireNextSession){
				if(!$scope.newUpdate.session.newDate || !$scope.newUpdate.session.newTime){ valid = false; };
			}

			if(options.requireRemarks){
				if(!$scope.newUpdate.info){ valid = false; };
			}

			return valid;
		} else {
			return false;
		}
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);
'use strict';

angular.module('caseModule').controller('updateConsultantCaseController', ['$scope', '$modalInstance', 'connectAdminFactory', 'memoInfo', 'connectCaseFactory', function ($scope, $modalInstance, connectAdminFactory, memoInfo, connectCaseFactory) {
	$scope.memoInfo = memoInfo;

	connectAdminFactory.query({'page': 'consultant', 'action': 'available'}, function (response) {
		$scope.consultants = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.updateConsultant = function(){
		if($scope.memoInfo.caseId &&  $scope.memoInfo.updateId && $scope.consultantIndex){
			//get the selected consultant
			var update = {
				'caseId': $scope.memoInfo.caseId,
				'memoId': $scope.memoInfo.updateId,
				'memoConsultantId': $scope.consultants[$scope.consultantIndex]._id
			}

			connectCaseFactory.save({'action': 'memos', 'subaction': 'insertconsultant'}, {'update': update}, function(response){
				$modalInstance.dismiss('cancel');
			}, function(error){
				$scope.error = error.data.message;
			});
		}
	}


}]);
'use strict';


angular.module('caseModule').controller('uploadMemoConsultantCaseController', ['$modalInstance', '$scope', 'memoInfo', '$http', function ($modalInstance, $scope, memoInfo, $http) {
	$scope.memoInfo = memoInfo;
	$scope.closeModal = function () {
		$modalInstance.dismiss('cancel');
	}

	$scope.uploadMemo = function () {
		var formData = new FormData();
		var doc = document.getElementById('doc').files[0];
		formData.append('doc', doc);

		$http.post('/api/v1/case/' + $scope.memoInfo.caseId + '/upload/'+ $scope.memoInfo.updateId, formData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		}).success(function(data, success){
			$modalInstance.dismiss('cancel');
		})
		.error(function(data, error){
			$modalInstance.dismiss('cancel');
		});
	}
}]);
'use strict';

angular.module('caseModule').factory('connectCaseFactory', ['$resource', function ($resource) {
	return $resource('api/v1/case/:caseId/:action/:actionId/:subaction/:id');
}])
'user strict';

angular.module('authModule').controller('signinAuthController', ['registerUserConfigFactory', '$scope', '$http', '$location', '$rootScope', function (registerUserConfigFactory, $scope, $http, $location, $rootScope) {
	$scope.signIn = function () {
		$http.post('/api/v1/login', $scope.credentials)
		.success(function (data, success) {
			registerUserConfigFactory.setUser(data);
			if($rootScope.lastPage){
				$location.path($rootScope.lastPage);
			} else {
				if(data.role == 'admin'){
					$location.path('/admin/report');
				} else if(data.role == 'client') {
					$location.path('/client');
				} else if(data.role == 'employee'){
					$location.path('/employee');
				} else if(data.role == 'consultant'){
					$location.path('/consultant');
				}
			}
		})
		.error(function (data, error) {
			$scope.error = data;
		});
	};
}]);
'use strict';

angular.module('authModule').controller('signInProviderAuthController', ['$scope', '$http', '$location', 'connectAccountAuthFactory', '$stateParams', 'countryListConfigFactory', function ($scope, $http, $location, connectAccountAuthFactory, $stateParams, countryListConfigFactory) {
	$scope.countryList = countryListConfigFactory;

	connectAccountAuthFactory.get({id: $stateParams.id}, function (response) {
		$scope.credentials = response;
	});

	$scope.signUp = function () {
		connectAccountAuthFactory.save({id: $stateParams.id}, $scope.credentials, function (data, res) {
			$location.path('/signin');
		},
		function (err) {
			$scope.error = err.data.message;
		});
	}


}]);
'user strict';

angular.module('authModule').controller('signoutAuthController', ['registerUserConfigFactory', '$http', '$state', function (registerUserConfigFactory, $http, $state) {
	$http.get('/api/v1/logout')
	.success(function (data, success) {
		registerUserConfigFactory.clearUserInfo();
		$state.go('home', {}, {reload: true});
	});
}]);
'use strict';

angular.module('authModule').factory('connectAccountAuthFactory', ['$resource', function ($resource) {
	return $resource('api/v1/account/:action/:id');
}]);
'use strict';

angular.module('authModule').factory('connectAuthFactory', ['$resource', function ($resource) {
		return $resource('/api/v1/user/:id');
}]);
'use strict';

angular.module('legality').controller('ModalInstanceConfigController', ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance) {
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	}
}]);
'use strict';

angular.module('legality').controller('errorConfigController', ['$scope', function ($scope) {
	
}]);
'use strict';

angular.module('legality').controller('navConfig', ['$rootScope', '$scope', 'registerUserConfigFactory', '$state', function ($rootScope, $scope, registerUserConfigFactory, $state) {
	//initiate the nav with the defult nav 'user'
	$scope.nav = 'public/modules/config/view/user.nav.html';
	//initiate the menu in mobile and tables in no collapse status
	$scope.navbarCollapsed = false;

	// Collapsing the menu after navigation
	$scope.$on('$stateChangeSuccess', function() {
		$scope.navbarCollapsed = false;
	});

	$scope.user = registerUserConfigFactory.getUser();

	// Watch the user
	$rootScope.$watch('logged', function () {
		if($rootScope.logged){
			//get the current user data
			$scope.user = registerUserConfigFactory.getUser();

			//get the nav for the user role ('admin', 'user', etc..)
			switch($scope.user.role){
				case 'admin':
					//navigation menu
					$scope.nav = 'public/modules/config/view/admin.nav.html';
					break;
				case 'employee':
					//navigation menu
					$scope.nav = 'public/modules/config/view/employee.nav.html';
					break;
				case 'consultant':
					//navigation menu
					$scope.nav = 'public/modules/config/view/consultant.nav.html';
					break;
				case 'client':
					//navigation menu
					$scope.nav = 'public/modules/config/view/client.nav.html';
					break;
				default :
					//navigation menu
					$scope.nav = 'public/modules/config/view/user.nav.html';
					break;
			}

			$scope.loggedLink = true;
			$scope.notLoggedLink = false;
		} else {
			$scope.nav = 'public/modules/config/view/user.nav.html';
			$scope.loggedLink = false;
			$scope.notLoggedLink = true;
		}
	});

	$scope.searchUser = function () {
		if($scope.searchPhrase){
			$state.go('search.user', {name: $scope.searchPhrase});
			$scope.searchPhrase = '';
		}
	}

	$scope.searchProudct = function () {
		if($scope.searchPhrase){
			$state.go('search.product', {name: $scope.searchPhrase});
			$scope.searchPhrase = '';
		}
	}

}]);

'use strict';

angular.module('legality').directive('spinnerOnLoadConfigDirective', [function () {
    return {
        restrict: 'A',
        link: function(scope, element) {
          element.on('load', function() {
            // Set visibility: true + remove spinner overlay
              element.removeClass('spinner-hide');
              element.addClass('spinner-show');
              element.parent().find('span').remove();
          });
          scope.$watch('ngSrc', function() {
            // Set visibility: false + inject temporary spinner overlay
              element.addClass('spinner-hide');
              // element.parent().append('<span class="spinner"></span>');
          });
        }
    }	
}]);
'use strict';

angular.module('legality').directive('styleImageConfigDirective', ['$modal', '$rootScope', function ($modal, $rootScope) {
	return {
		require: '?ngModel',
		restrict: 'A',
		replace: false,
		transclude: true,
		link: function (scope, elem, attrs, ngModel) {
			//create canvas object
			var //the imageID
			imageId = 'lab',
			x = document.getElementById(imageId),
			//create the canvas
			canvas = x.getContext("2d"),
			//create a new file read object
			reader = new FileReader(),
			//create new image object
			newImage =  new Image();

			//set/fill the background color
			canvas.fillStyle = "#000";
			canvas.fillRect(0, 0, x.width, x.height);

			//on file upload
			elem.bind('change', function (e) {
				//On image load
				reader.onload = function(image){
					//give the newImage variable the uploaded image source
					newImage.src = image.target.result;
					var maxWidth = x.width,
						maxHeight = x.height;

					//resize the image height
					if(newImage.height > maxHeight){
						newImage.width *= maxHeight / newImage.height
						newImage.height = maxHeight;
					}

					//resize the image width
					if(newImage.width > maxWidth){
						newImage.height *= maxWidth / newImage.width;
						newImage.width = maxWidth;
					}

					//clear the canvas
					canvas.clearRect(0, 0, canvas.width, canvas.height);

					//set canvas width and height
					canvas.width = newImage.width;
					canvas.height = newImage.height;
					//draw image into canvas and center it
					canvas.drawImage(newImage, (x.width - newImage.width) / 2, (x.height - newImage.height) / 2, newImage.width, newImage.height);
				};

				//upload,initiate and read the selected file through the file input element
				reader.readAsDataURL(elem[0].files[0]);
			});

			//resize the image elemnt and draw it into the canvas
			function resizeAndDraw (id) {
				Caman('#' + id, function () {
					//get current height and width
					var width = this.width,
					height = this.height;
					//set the height to 500 max if exceeded 500
					if(width > x.width){
						width = x.width;
						this.resize({width: width});
					} else {
						width = this.width;
					}

					//render the image
					this.render();
				});
			}

			scope.save = function () {
				Caman('#' + imageId, function () {
					this.render(function () {
						 this.save();
					});
				});
			}

			scope.reset = function () {
				Caman('#' + imageId, function () {
					this.revert();
				});
			}

			scope.imageFilter = function (name) {
			    Caman('#' + imageId, function () {
			    	this.revert();
			    	switch(name){
			    		case "crossProcess":
			    			this.crossProcess();
			    			break;
			    		case "vintage":
			    			this.vintage();
			    			break;
			    		case "lomo":
			    			this.lomo()
			    			break;
			    		case "clarity":
			    			this.clarity();
			    			break;
			    		case "love":
			    			this.love();
			    			break;
			    		case "oldBoot":
			    			this.oldBoot();
			    			break;
			    		case "glowingSun":
			    			this.glowingSun();
			    			break;
			    		case "hazyDays":
			    			this.hazyDays();
			    			break;
			    		case "nostalgia":
			    			this.nostalgia();
			    			break;
			    		case "hemingway":
			    			this.hemingway();
			    			break;
			    		case "concentrate":
			    			this.concentrate();
			    			break;
			    		case "jarques":
			    			this.jarques();
			    			break;
			    		case "pinhole":
			    			this.pinhole();
			    			break;
			    		case "grungy":
			    			this.grungy();
			    			break;
			    	}
			    	this.render();
				});
			}

		}
	}
}]);
'use strict';

angular.module('legality').directive('typeConfigDirective', ['$interval', '$timeout', function ($interval, $timeout) {
	return {
		require: '?ngModel',
		restrict: 'A',
		replace: true,
		transclude: false,
		scope: {
			"text": "@text",
			"delay": "@delay",
			"startDelay": "@startDelay",
			"stop": "@stop"
		},
		link: function (scope, elem, attrs, ngModel) {
			function init(){
				$timeout(function(){
					var startDelay = scope.startDelay,
						delay = scope.delay;

					if(!scope.text) return;
					if(!delay) delay = '100';
					if(!startDelay) startDelay = '500';

					function type(){
						$interval.cancel();
						var type = '';
						var i=0;

						var timer = $interval(function(){
						    if(i<scope.text.length){
						       type += scope.text[i];
						       elem.html(type);
						    } else {
						        $interval.cancel(timer);
						    }
						    i++;
						}, delay);
					}

					$timeout(function(){
						type();
					}, startDelay);

				}, 200);
			}
			var stop = false
			if(scope.stop) stop = true;

			if(!stop){
				init();
			}
		}
	}
}]);
'use strict';

angular.module('legality').directive('watchImageConfigDirective', ['$modal', '$rootScope', function ($modal, $rootScope) {
	return {
		require: '?ngModel',
		restrict: 'A',
		replace: false,
		transclude: false,
		scope: {
			"id": "@id",
			"imagePlaceHolder": "@imagePlaceHolder"
		},
		link: function (scope, elem, attrs, ngModel) {
			//if the image is 'required' for validation (we know throw the attribute 'required=true' that we add)
			//then set the validaity to false as if we did not it will always pass if we set a 'imagePlaceHolder'
			//to a defult value
			if(ngModel && attrs.required){
				ngModel.$setValidity("file loaded", false);
				ngModel.$render();
			}

			//create the canvas
			var x = document.getElementById(scope.id + 'Preview'),
				img = new Image();

			attrs.$observe('imagePlaceHolder', function () {
				//set placeholder image src
				img.src = scope.imagePlaceHolder;
			});

			//create the canvas
			var canvas = x.getContext("2d");
			//set/fill the background color
			canvas.fillStyle = "#fff";
			canvas.fillRect(0, 0, x.width, x.height);

			//draw an image "placeholder" once the created image is loaded
			img.onload = function () {
				draw();
			}

			function draw () {
				//give the newImage variable the uploaded image source
				//img.src = image.target.result;
				var maxWidth = x.width,
					maxHeight = x.height;

				//resize the image height
				if(img.height > maxHeight){
					img.width *= maxHeight / img.height
					img.height = maxHeight;
				}

				//resize the image width
				if(img.width > maxWidth){
					img.height *= maxWidth / img.width;
					img.width = maxWidth;
				}

				//clear the canvas
				canvas.clearRect(0, 0, x.width, x.height);
				canvas.fillRect(0, 0, x.width, x.height);

				//set canvas width and height
				canvas.width = img.width;
				canvas.height = img.height;
				//draw image into canvas and center it
				canvas.drawImage(img, (x.width - img.width) / 2, (x.height - img.height) / 2, img.width, img.height);
				var canvasBase64 = x.toDataURL("image/jpeg");
				ngModel.$setViewValue(canvasBase64);
			}

			//Full File API support.
			if ( window.FileReader && window.File && window.FileList && window.Blob ){
				//register a click even on an image the has the 'file input' field name plus 'Preview'
				//which when clicked it trigers the click even on the input field to upload a file
				document.getElementById(scope.id + 'Preview').onclick = function () {
					document.getElementById(scope.id).click();
				}

				elem.bind('change', function (e) {
					//get the file data
					var reader = new FileReader();

					//after loading validate the uploaded file other wise show the modal 'error message'
					reader.onload = function (image) {
							//clear the canvas
							canvas.clearRect(0, 0, canvas.width, canvas.height);
							canvas.fillRect(0, 0, canvas.width, canvas.height);

							//clear the area
							canvas.fillStyle = "#fff";


						//make sure the file size is less than 10MB
						if(image.loaded > 1024 * 1024 * 10){
							//upadte the 'input file' field to be false as the file size is more than 1MB
							scope.$apply(function () {
								if(ngModel){
									ngModel.$setValidity("file loaded", false);
									ngModel.$render();
								}
							});
							//show the madal 'error message'
							var modalInstance = $modal.open({
								controller: function () {
									$rootScope.cancel = function () {
										modalInstance.dismiss('cancel');
									}
								},
								template: '<button ng-click="cancel()" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="alert alert-danger text-center">Maximum image size is 10MB</h4>'
							});
						} else {
							//if the passed the validation then update the 'input file' field be true
							scope.$apply(function () {
								if(ngModel){
									ngModel.$setValidity("file loaded", true);
									ngModel.$render();
								}
							});

							img.src = image.target.result;
							draw();
						}
					}
					reader.readAsDataURL(elem[0].files[0]);	
				});

			} else {
				$modal.open({
					template: '<h4 class="alert alert-danger">Please use a modern browser to browse legality!!!</h4>'
				});
			}
		}
	}
}]);
'user strict';

angular.module('legality').factory('countryListConfigFactory' ,function () {
	return [ 
		  {name: 'Afghanistan', code: 'AF'}, 
		  {name: 'Åland Islands', code: 'AX'}, 
		  {name: 'Albania', code: 'AL'}, 
		  {name: 'Algeria', code: 'DZ'}, 
		  {name: 'American Samoa', code: 'AS'}, 
		  {name: 'AndorrA', code: 'AD'}, 
		  {name: 'Angola', code: 'AO'}, 
		  {name: 'Anguilla', code: 'AI'}, 
		  {name: 'Antarctica', code: 'AQ'}, 
		  {name: 'Antigua and Barbuda', code: 'AG'}, 
		  {name: 'Argentina', code: 'AR'}, 
		  {name: 'Armenia', code: 'AM'}, 
		  {name: 'Aruba', code: 'AW'}, 
		  {name: 'Australia', code: 'AU'}, 
		  {name: 'Austria', code: 'AT'}, 
		  {name: 'Azerbaijan', code: 'AZ'}, 
		  {name: 'Bahamas', code: 'BS'}, 
		  {name: 'Bahrain', code: 'BH'}, 
		  {name: 'Bangladesh', code: 'BD'}, 
		  {name: 'Barbados', code: 'BB'}, 
		  {name: 'Belarus', code: 'BY'}, 
		  {name: 'Belgium', code: 'BE'}, 
		  {name: 'Belize', code: 'BZ'}, 
		  {name: 'Benin', code: 'BJ'}, 
		  {name: 'Bermuda', code: 'BM'}, 
		  {name: 'Bhutan', code: 'BT'}, 
		  {name: 'Bolivia', code: 'BO'}, 
		  {name: 'Bosnia and Herzegovina', code: 'BA'}, 
		  {name: 'Botswana', code: 'BW'}, 
		  {name: 'Bouvet Island', code: 'BV'}, 
		  {name: 'Brazil', code: 'BR'}, 
		  {name: 'British Indian Ocean Territory', code: 'IO'}, 
		  {name: 'Brunei Darussalam', code: 'BN'}, 
		  {name: 'Bulgaria', code: 'BG'}, 
		  {name: 'Burkina Faso', code: 'BF'}, 
		  {name: 'Burundi', code: 'BI'}, 
		  {name: 'Cambodia', code: 'KH'}, 
		  {name: 'Cameroon', code: 'CM'}, 
		  {name: 'Canada', code: 'CA'}, 
		  {name: 'Cape Verde', code: 'CV'}, 
		  {name: 'Cayman Islands', code: 'KY'}, 
		  {name: 'Central African Republic', code: 'CF'}, 
		  {name: 'Chad', code: 'TD'}, 
		  {name: 'Chile', code: 'CL'}, 
		  {name: 'China', code: 'CN'}, 
		  {name: 'Christmas Island', code: 'CX'}, 
		  {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
		  {name: 'Colombia', code: 'CO'}, 
		  {name: 'Comoros', code: 'KM'}, 
		  {name: 'Congo', code: 'CG'}, 
		  {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
		  {name: 'Cook Islands', code: 'CK'}, 
		  {name: 'Costa Rica', code: 'CR'}, 
		  {name: 'Cote D\'Ivoire', code: 'CI'}, 
		  {name: 'Croatia', code: 'HR'}, 
		  {name: 'Cuba', code: 'CU'}, 
		  {name: 'Cyprus', code: 'CY'}, 
		  {name: 'Czech Republic', code: 'CZ'}, 
		  {name: 'Denmark', code: 'DK'}, 
		  {name: 'Djibouti', code: 'DJ'}, 
		  {name: 'Dominica', code: 'DM'}, 
		  {name: 'Dominican Republic', code: 'DO'}, 
		  {name: 'Ecuador', code: 'EC'}, 
		  {name: 'Egypt', code: 'EG'}, 
		  {name: 'El Salvador', code: 'SV'}, 
		  {name: 'Equatorial Guinea', code: 'GQ'}, 
		  {name: 'Eritrea', code: 'ER'}, 
		  {name: 'Estonia', code: 'EE'}, 
		  {name: 'Ethiopia', code: 'ET'}, 
		  {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
		  {name: 'Faroe Islands', code: 'FO'}, 
		  {name: 'Fiji', code: 'FJ'}, 
		  {name: 'Finland', code: 'FI'}, 
		  {name: 'France', code: 'FR'}, 
		  {name: 'French Guiana', code: 'GF'}, 
		  {name: 'French Polynesia', code: 'PF'}, 
		  {name: 'French Southern Territories', code: 'TF'}, 
		  {name: 'Gabon', code: 'GA'}, 
		  {name: 'Gambia', code: 'GM'}, 
		  {name: 'Georgia', code: 'GE'}, 
		  {name: 'Germany', code: 'DE'}, 
		  {name: 'Ghana', code: 'GH'}, 
		  {name: 'Gibraltar', code: 'GI'}, 
		  {name: 'Greece', code: 'GR'}, 
		  {name: 'Greenland', code: 'GL'}, 
		  {name: 'Grenada', code: 'GD'}, 
		  {name: 'Guadeloupe', code: 'GP'}, 
		  {name: 'Guam', code: 'GU'}, 
		  {name: 'Guatemala', code: 'GT'}, 
		  {name: 'Guernsey', code: 'GG'}, 
		  {name: 'Guinea', code: 'GN'}, 
		  {name: 'Guinea-Bissau', code: 'GW'}, 
		  {name: 'Guyana', code: 'GY'}, 
		  {name: 'Haiti', code: 'HT'}, 
		  {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
		  {name: 'Holy See (Vatican City State)', code: 'VA'}, 
		  {name: 'Honduras', code: 'HN'}, 
		  {name: 'Hong Kong', code: 'HK'}, 
		  {name: 'Hungary', code: 'HU'}, 
		  {name: 'Iceland', code: 'IS'}, 
		  {name: 'India', code: 'IN'}, 
		  {name: 'Indonesia', code: 'ID'}, 
		  {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
		  {name: 'Iraq', code: 'IQ'}, 
		  {name: 'Ireland', code: 'IE'}, 
		  {name: 'Isle of Man', code: 'IM'}, 
		  {name: 'Israel', code: 'IL'}, 
		  {name: 'Italy', code: 'IT'}, 
		  {name: 'Jamaica', code: 'JM'}, 
		  {name: 'Japan', code: 'JP'}, 
		  {name: 'Jersey', code: 'JE'}, 
		  {name: 'Jordan', code: 'JO'}, 
		  {name: 'Kazakhstan', code: 'KZ'}, 
		  {name: 'Kenya', code: 'KE'}, 
		  {name: 'Kiribati', code: 'KI'}, 
		  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
		  {name: 'Korea, Republic of', code: 'KR'}, 
		  {name: 'Kuwait', code: 'KW'}, 
		  {name: 'Kyrgyzstan', code: 'KG'}, 
		  {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
		  {name: 'Latvia', code: 'LV'}, 
		  {name: 'Lebanon', code: 'LB'}, 
		  {name: 'Lesotho', code: 'LS'}, 
		  {name: 'Liberia', code: 'LR'}, 
		  {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
		  {name: 'Liechtenstein', code: 'LI'}, 
		  {name: 'Lithuania', code: 'LT'}, 
		  {name: 'Luxembourg', code: 'LU'}, 
		  {name: 'Macao', code: 'MO'}, 
		  {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
		  {name: 'Madagascar', code: 'MG'}, 
		  {name: 'Malawi', code: 'MW'}, 
		  {name: 'Malaysia', code: 'MY'}, 
		  {name: 'Maldives', code: 'MV'}, 
		  {name: 'Mali', code: 'ML'}, 
		  {name: 'Malta', code: 'MT'}, 
		  {name: 'Marshall Islands', code: 'MH'}, 
		  {name: 'Martinique', code: 'MQ'}, 
		  {name: 'Mauritania', code: 'MR'}, 
		  {name: 'Mauritius', code: 'MU'}, 
		  {name: 'Mayotte', code: 'YT'}, 
		  {name: 'Mexico', code: 'MX'}, 
		  {name: 'Micronesia, Federated States of', code: 'FM'}, 
		  {name: 'Moldova, Republic of', code: 'MD'}, 
		  {name: 'Monaco', code: 'MC'}, 
		  {name: 'Mongolia', code: 'MN'}, 
		  {name: 'Montserrat', code: 'MS'}, 
		  {name: 'Morocco', code: 'MA'}, 
		  {name: 'Mozambique', code: 'MZ'}, 
		  {name: 'Myanmar', code: 'MM'}, 
		  {name: 'Namibia', code: 'NA'}, 
		  {name: 'Nauru', code: 'NR'}, 
		  {name: 'Nepal', code: 'NP'}, 
		  {name: 'Netherlands', code: 'NL'}, 
		  {name: 'Netherlands Antilles', code: 'AN'}, 
		  {name: 'New Caledonia', code: 'NC'}, 
		  {name: 'New Zealand', code: 'NZ'}, 
		  {name: 'Nicaragua', code: 'NI'}, 
		  {name: 'Niger', code: 'NE'}, 
		  {name: 'Nigeria', code: 'NG'}, 
		  {name: 'Niue', code: 'NU'}, 
		  {name: 'Norfolk Island', code: 'NF'}, 
		  {name: 'Northern Mariana Islands', code: 'MP'}, 
		  {name: 'Norway', code: 'NO'}, 
		  {name: 'Oman', code: 'OM'}, 
		  {name: 'Pakistan', code: 'PK'}, 
		  {name: 'Palau', code: 'PW'}, 
		  {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
		  {name: 'Panama', code: 'PA'}, 
		  {name: 'Papua New Guinea', code: 'PG'}, 
		  {name: 'Paraguay', code: 'PY'}, 
		  {name: 'Peru', code: 'PE'}, 
		  {name: 'Philippines', code: 'PH'}, 
		  {name: 'Pitcairn', code: 'PN'}, 
		  {name: 'Poland', code: 'PL'}, 
		  {name: 'Portugal', code: 'PT'}, 
		  {name: 'Puerto Rico', code: 'PR'}, 
		  {name: 'Qatar', code: 'QA'}, 
		  {name: 'Reunion', code: 'RE'}, 
		  {name: 'Romania', code: 'RO'}, 
		  {name: 'Russian Federation', code: 'RU'}, 
		  {name: 'RWANDA', code: 'RW'}, 
		  {name: 'Saint Helena', code: 'SH'}, 
		  {name: 'Saint Kitts and Nevis', code: 'KN'}, 
		  {name: 'Saint Lucia', code: 'LC'}, 
		  {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
		  {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
		  {name: 'Samoa', code: 'WS'}, 
		  {name: 'San Marino', code: 'SM'}, 
		  {name: 'Sao Tome and Principe', code: 'ST'}, 
		  {name: 'Saudi Arabia', code: 'SA'}, 
		  {name: 'Senegal', code: 'SN'}, 
		  {name: 'Serbia and Montenegro', code: 'CS'}, 
		  {name: 'Seychelles', code: 'SC'}, 
		  {name: 'Sierra Leone', code: 'SL'}, 
		  {name: 'Singapore', code: 'SG'}, 
		  {name: 'Slovakia', code: 'SK'}, 
		  {name: 'Slovenia', code: 'SI'}, 
		  {name: 'Solomon Islands', code: 'SB'}, 
		  {name: 'Somalia', code: 'SO'}, 
		  {name: 'South Africa', code: 'ZA'}, 
		  {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
		  {name: 'Spain', code: 'ES'}, 
		  {name: 'Sri Lanka', code: 'LK'}, 
		  {name: 'Sudan', code: 'SD'}, 
		  {name: 'Suriname', code: 'SR'}, 
		  {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
		  {name: 'Swaziland', code: 'SZ'}, 
		  {name: 'Sweden', code: 'SE'}, 
		  {name: 'Switzerland', code: 'CH'}, 
		  {name: 'Syrian Arab Republic', code: 'SY'}, 
		  {name: 'Taiwan, Province of China', code: 'TW'}, 
		  {name: 'Tajikistan', code: 'TJ'}, 
		  {name: 'Tanzania, United Republic of', code: 'TZ'}, 
		  {name: 'Thailand', code: 'TH'}, 
		  {name: 'Timor-Leste', code: 'TL'}, 
		  {name: 'Togo', code: 'TG'}, 
		  {name: 'Tokelau', code: 'TK'}, 
		  {name: 'Tonga', code: 'TO'}, 
		  {name: 'Trinidad and Tobago', code: 'TT'}, 
		  {name: 'Tunisia', code: 'TN'}, 
		  {name: 'Turkey', code: 'TR'}, 
		  {name: 'Turkmenistan', code: 'TM'}, 
		  {name: 'Turks and Caicos Islands', code: 'TC'}, 
		  {name: 'Tuvalu', code: 'TV'}, 
		  {name: 'Uganda', code: 'UG'}, 
		  {name: 'Ukraine', code: 'UA'}, 
		  {name: 'United Arab Emirates', code: 'AE'}, 
		  {name: 'United Kingdom', code: 'GB'}, 
		  {name: 'United States', code: 'US'}, 
		  {name: 'United States Minor Outlying Islands', code: 'UM'}, 
		  {name: 'Uruguay', code: 'UY'}, 
		  {name: 'Uzbekistan', code: 'UZ'}, 
		  {name: 'Vanuatu', code: 'VU'}, 
		  {name: 'Venezuela', code: 'VE'}, 
		  {name: 'Viet Nam', code: 'VN'}, 
		  {name: 'Virgin Islands, British', code: 'VG'}, 
		  {name: 'Virgin Islands, U.S.', code: 'VI'}, 
		  {name: 'Wallis and Futuna', code: 'WF'}, 
		  {name: 'Western Sahara', code: 'EH'}, 
		  {name: 'Yemen', code: 'YE'}, 
		  {name: 'Zambia', code: 'ZM'}, 
		  {name: 'Zimbabwe', code: 'ZW'} 
		]
});
'use strict';

angular.module('legality').factory('helperConfigFactory', [function () {
	return {
		'map': function (arr, fn) {
			for(var i=0; i <= arr.length; i++){
				if(fn(arr[i])){
					return i;
				}
			}
			return false;
		}
	}
}]);
'use strict';

angular.module('legality').factory('registerUserConfigFactory', ['$window', '$rootScope', '$q', function ($window, $rootScope, $q) {
	//Get the user info from the window element that has been injected in the index page on the server side
	var _this = {};

	//user info
	_this.user = false;

	//Read user info
	_this.readUserInfo = function () {
		return _this.user = $window.userInfo || false;
	};

	//Clear user info from the browser and change the rootScope status to false
	_this.clearUserInfo = function () {
		//var element = document.getElementById("userInfoBlock"); //this code dose not seem to work!
		//if(element) element.parentNode.removeChild(element); //this code dose not seem to work!
		$rootScope.logged = false;
		$rootScope.lastPage = '';
		_this.user = $window.userInfo = false;
	};

	//register user info
	_this.setUser = function (user) {
		_this.user = $window.userInfo = user || false;
		if(_this.user){
			$rootScope.logged = true;
		};
	};

	//Get the user info
	_this.getUser = function () {
		var deferred = $q.defer();
		deferred.resolve(_this.readUserInfo());
		deferred.promise.then(function (result) {
		 	if(result){
		 		_this.user = result;
		 		$rootScope.logged = true;
		 	};
		});
		return _this.user;
	};

	return _this;
}]);
'use strict';

angular.module('legality').factory('requreLoginConfigFactory', ['$modal', '$rootScope', '$location', function ($modal, $rootScope, $location) {
	return {
		open: function (service) {
			$rootScope.lastPage = $location.path();
			if(!service){
				service = '';
			}
			$modal.open({
				templateUrl: 'public/modules/config/view/require.login.config.view.html',
				size: 'md',
				controller: 'ModalInstanceConfigController'
			});
		}

	}

}]);
'use strict';

angular.module('legality').factory('socketConfigFactory', ['socketFactory', function (socketFactory) {
	return socketFactory();
}]);
'use strict';

angular.module('legality').filter('dateRangeConfigFilter', [function () {
	return function(dataArray, dateFieldName, from, to){
		if(!dataArray || !dateFieldName) return;
		if(Object.prototype.toString.call(dataArray) !== '[object Array]') return;

		var dateFrom = (Object.prototype.toString.call(from) === "[object Date]")? new Date(from) : false;
		var dateTo = (Object.prototype.toString.call(to) === "[object Date]")? new Date(to): false;
		var newdataArray = [];

		var _map = function(array, cb){
			var newArray = [];
			for(var i=0;i<array.length;i++){
				var result = cb(array[i]);
				if(result){
					newArray.push(result);
				}
			}
			return newArray;
		}

		var _check = function(date){
			if(dateFrom && dateTo){
				return ((date >= dateFrom) && (date <= dateTo))? true: false;
			} else if(dateFrom && !dateTo){
				return (date >= dateFrom)? true: false;
			} else if(!dateFrom && dateTo){
				return (date <= dateTo)? true: false;
			} else {
				return true;
			}
		}

		newdataArray = _map(dataArray, function(val){
			if(val[dateFieldName]){
				var checkDate = new Date(val[dateFieldName]);
				if(_check(checkDate)){
					return val;
				}
			}
			return false;
		});

		return newdataArray;
	}
}]);
'use strict';

//excerpt text
angular.module('legality').filter('excerpt', [function () {
	return function (text, max) {
		//the result to be returned
		var result='';

		//check if the user has passed a max value , otherwise set the max to 200
		if(!max){
			max = 200;
		} else {
			//if the max value is more than the text lenght then make the max equals to
			//the text length to avoid issues in the below loop
			if(max > text.length){
				max = text.length;
			}
		}

		//loop through the text and assign the value to result
		var length = (text.length <= 200 && max==200) ? text.length:max;
		for(var i=0; i < length;i++){
			result += text[i];
		}

		//if the text length was more than the max value
		//then add couple of dots at the end of the result
		if(text.length > max){
			result += '.....';
		}

		return result;
	}
}]);
'use strict';

angular.module('legality').filter('localize', ['arLang', function (arLang) {
	return function (text, lang) {
		text = (text === true)? 'true': text;
		text = (text === false)? 'false': text;
		if(!lang || !text) return text;
		text = text.toLowerCase();

		var localLang,
			result;
		//select language
		switch(lang){
			case "ar":
				localLang = arLang;
				break;
		}

		result = (localLang[text] == undefined)? text: localLang[text];
		return result;
	}
}]);
'user strict';

angular.module('legality').filter('unique', [function () {
    return function(input) {
    	if(typeof input == 'undefined'){return;}
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
        	//this is how we get the data from the api!!!
        	//user[0].country[0].name     ---- for the country name
        	if(uniqueList.indexOf(input[i].user[0].country[0].name) == -1){
        		uniqueList.push(input[i].user[0].country[0].name);
        	}
        }
        return uniqueList;
    }
}]);
'use strict';

angular.module('legality').factory('arLang', [function () {
	return {
		'admin': 'إداري',
		'pending': 'معلقة',
		'close': 'مغلقة',
		'closed': 'مغلقة',
		'client': 'موكل',
		'defendant': 'خصم',
		'case': 'قضية',
		'update': 'تحديث',
		'session': 'جلسة',
		'employee': 'موظف',
		'user': 'مستخدم',
		'consultant': 'مستشار',
		'email already exist': 'البريد الإلكتروني غير متاح',
		'open': 'سارية',
		'first respondant': 'المدعى عليه الأول',
		'true': 'نعم',
		'false': 'لا',
		'client already exists': 'الموكل مضاف مسبقا',
		'defendant already exists': 'الخصم مضاف مسبقا',
		'no file has been uploaded': 'لم يتم رفع أي مستند',
		'current password is not correct': 'كلمة السر الحالية غير صحيحة'
	}
}]);
'use strict';

angular.module('consultantModule').controller('indexConsultantController', ['$scope', 'registerUserConfigFactory', '$state', function ($scope,registerUserConfigFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'consultant') $state.go('signin');

	$state.go('consultant.memos');
}]);
'use strict';

angular.module('clientModule').controller('addClientController', ['$scope', '$modalInstance', 'connectCaseFactory', 'selectedCase', 'closeParentModal', 'connectCaseRoleFactory', function ($scope, $modalInstance, connectCaseFactory, selectedCase, closeParentModal, connectCaseRoleFactory) {
	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewClient = function(){
		$scope.error = false;
		$scope.userInfo.role = 'client';
		connectCaseFactory.save({'action': 'client', 'subaction': 'new'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			$modalInstance.dismiss('cancel');
			closeParentModal();
		}, function(error){
			$scope.error = error.data.message;
		});
	}


}]);
'use strict';

angular.module('clientModule').controller('dashboardClientController', ['$scope', 'registerUserConfigFactory', '$state', function ($scope, registerUserConfigFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'client') $state.go('signin');

	$state.go('client.case');
}]);
'use strict';

angular.module('clientModule').controller('indexClientController', ['$scope', '$modalInstance', 'connectUserFactory', 'clients', 'selectedClients', 'caseRoles', function ($scope, $modalInstance, connectUserFactory, clients, selectedClients, caseRoles) {
	//init the client info
	$scope.userInfo = {};
	$scope.userInfo.role = 'client';

	$scope.createNewClient = function(){
		$scope.error = false;
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			selectedClients.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.caseRoles = caseRoles;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);
'use strict';

angular.module('clientModule').controller('switchClientController', ['$scope', 'connectAdminFactory', '$modalInstance', '$modal', 'selectedCase', 'connectCaseRoleFactory', 'connectCaseFactory', function ($scope, connectAdminFactory, $modalInstance, $modal, selectedCase, connectCaseRoleFactory, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	connectAdminFactory.query({page: 'client', action: 'available'}, function(response){
		$scope.clients = response;
	});

	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.creatClient = function(){
		$scope.error = false;
		$scope.userInfo.userId = $scope.clients[$scope.userIndex]._id;
		connectCaseFactory.save({'action': 'client'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.showCreateClientForm = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/add.client.view.html',
			controller: 'addClientController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				},
				closeParentModal: function(){
					return $scope.closeModal;
				}
			}
		});
	}


}]);
'use strict';

angular.module('caseRoleModule').factory('connectCaseRoleFactory', ['$resource', function ($resource) {
	return $resource('api/v1/caserole/:id/:action');
}]);
'use strict';

angular.module('caseRoleModule').controller('indexCaseRoleController', ['$scope', '$modalInstance', 'caseRoles', 'connectCaseRoleFactory', function ($scope, $modalInstance, caseRoles, connectCaseRoleFactory) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewCaseRole = function(){
		connectCaseRoleFactory.save({}, {'caseRoleInfo': $scope.newCaseRole}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);
'use strict';

angular.module('courtModule').controller('indexCourtController', ['$scope', '$modalInstance', 'connectAdminFactory', 'courts', function ($scope, $modalInstance, connectAdminFactory, courts) {
	//init
	$scope.courtInfo = {};
	//default value
	$scope.courtInfo.city = 'دبي';

	$scope.createCourte = function(){
		connectAdminFactory.save({page: 'court'}, {'courtInfo': $scope.courtInfo}, function(response){
			$scope.error = false;
			$modalInstance.dismiss('cancel');
		}, function(response){
			$scope.error = response.data.message;
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

}]);
'use strict';

angular.module('caseTypeModule').controller('indexCaseTypeController', ['$scope', '$modalInstance', 'connectCaseTypeFactory', 'caseTypes', function ($scope, $modalInstance, connectCaseTypeFactory, caseTypes) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewCaseType = function(){
		connectCaseTypeFactory.save({}, {'caseTypeInfo': $scope.newCaseType}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);
'use strict';

angular.module('caseTypeModule').factory('connectCaseTypeFactory', ['$resource', function ($resource) {
	return $resource('api/v1/casetype/:id/:action');
}]);
'use strict';

angular.module('defendantModule').controller('addDefendantController', ['$scope', '$modalInstance', 'connectCaseRoleFactory', 'closeParentModal', 'selectedCase', 'connectCaseFactory', function ($scope, $modalInstance, connectCaseRoleFactory, closeParentModal, selectedCase, connectCaseFactory) {
	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewDefendant = function(){
		$scope.error = false;
		connectCaseFactory.save({'action': 'defendant', 'subaction': 'new'}, {'caseId': selectedCase._id, 'userInfo': $scope.newDefendant}, function(response){
			$modalInstance.dismiss('cancel');
			closeParentModal();
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);
'use strict';

angular.module('defendantModule').controller('indexDefendantController', ['$scope', '$modalInstance', 'defendants', 'connectDefendantFactory', 'selectedDefendants', 'caseRoles', function ($scope, $modalInstance, defendants, connectDefendantFactory, selectedDefendants, caseRoles) {
	$scope.createNewDefendant = function(){
		connectDefendantFactory.save({}, {'defendantInfo': $scope.newDefendant}, function(response){
			selectedDefendants.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.caseRoles = caseRoles;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

}]);
'use strict';

angular.module('defendantModule').controller('switchDefendantController', ['$scope', '$modal', '$modalInstance', 'connectDefendantFactory', 'connectCaseRoleFactory', 'selectedCase', 'connectCaseFactory', function ($scope, $modal, $modalInstance, connectDefendantFactory, connectCaseRoleFactory, selectedCase, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	connectDefendantFactory.query({'action': 'available'}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewDefendant = function(){
		$scope.error = false;
		$scope.userInfo.userId = $scope.defendants[$scope.userIndex]._id;
		connectCaseFactory.save({'action': 'defendant'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.showCreateDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/add.defendant.view.html',
			controller: 'addDefendantController',
			backdrop: 'static',
			resolve: {
				closeParentModal: function(){
					return $scope.closeModal;
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}


}]);
'use strict';

angular.module('defendantModule').factory('connectDefendantFactory', ['$resource', function ($resource) {
	return $resource('api/v1/defendant/:id/:action');
}]);
'use strict';

angular.module('employeeModule').controller('indexEmployeeController', ['$scope', '$state', 'registerUserConfigFactory', function ($scope, $state, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'employee') $state.go('signin');

	$state.go('employee.sessions');


}]);
'user strict';

angular.module('homeModule').controller('indexHomeController', ['registerUserConfigFactory', 'connectContactHomeFactory', '$location', '$scope', function (registerUserConfigFactory, connectContactHomeFactory, $location, $scope) {
	$scope.user = registerUserConfigFactory.getUser();


}]);
'user strict';

angular.module('legality').factory('connectContactHomeFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/cms/contact');
}]);
'use strict';

angular.module('homeModule').factory('connectSearchHomeFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/search/:target/:name' ,{target: "@target" ,name: "@name"});
}]);
'use strict';

angular.module('reportModule').controller('indexReportController', ['$scope', '$state', 'registerUserConfigFactory', '$timeout', 'connectAdminFactory', 'socketConfigFactory', function ($scope, $state, registerUserConfigFactory, $timeout, connectAdminFactory, socketConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	$scope.report = {};

	var getReport = function () {
		connectAdminFactory.get({'page': 'report', "from": $scope.report.searchDateFrom, "to": $scope.report.searchDateTo},
		function (response) {
			var info = response.info;
			var dateInfo = response.dateInfo;
			var dateInput = response.dateInput;

			//set the search dates
			$scope.report.searchDateFrom = new Date(dateInput.from);
			$scope.report.searchDateTo = new Date(dateInput.to);


			//Acivities
			$scope.line = {};
			$scope.line.labels = [];
			$scope.line.series = ['المهام', 'القضايا', 'الجلسات', 'المذكرات'];
			$scope.line.data = [ [],[],[],[] ];

			for(var y in dateInfo){
				for(var m in dateInfo[y]){
					$scope.line.labels.push(y + "/" + m);
					$scope.line.data[3].push(dateInfo[y][m].memo);
					$scope.line.data[2].push(dateInfo[y][m].session);
					$scope.line.data[1].push(dateInfo[y][m].case);
					$scope.line.data[0].push(dateInfo[y][m].task);
				}
			}

			//Open and closed cases
			$scope.doughnut = {};
			$scope.doughnut.labels = ["القضايا المفتوحة", "القضايا المغلقة"];
			$scope.doughnut.data = [info.openCaseCount, info.closedCaseCount];


			//Courts and cases
			$scope.pie = {};
			$scope.pie.labels = [];
			$scope.pie.data = [];
			for(var i in info.courtCase){
				$scope.pie.labels.push(i);
				$scope.pie.data.push(info.courtCase[i]);
			}

			//Employees and sessions
			$scope.bar = {};
			$scope.bar.labels = [];
			$scope.bar.data = [[]];
			for(var i in info.sessions){
				$scope.bar.labels.push(i);
				$scope.bar.data[0].push(info.sessions[i]);
			}

			//Consultants and memos
			$scope.bar2 = {};
			$scope.bar2.labels =[];
			$scope.bar2.data = [[]];
			for(var i in info.memos){
				$scope.bar2.labels.push(i);
				$scope.bar2.data[0].push(info.memos[i]);
			}

			//Tasks
			$scope.bar3 = {};
			$scope.bar3.labels =[];
			$scope.bar3.data = [[]];
			for(var i in info.taskClosed.user){
				$scope.bar3.labels.push(i);
				$scope.bar3.data[0].push(info.taskClosed.user[i]);
			}

			//Tasks closed
			$scope.polarArea = {};
		    $scope.polarArea.labels = ["مغلقة", "معلقة", "مرفوضة"];
		    $scope.polarArea.data = [info.taskClosed.total, info.taskPendding.total, info.taskRejected.total];
		});	
	}


	//Init get report
	getReport();

	//listen to add
	socketConfigFactory.on('reports.update', function (state) {
		if(state){
			getReport();
		}
	});

	$scope.searchReport = function () {
		getReport();
	}

	
}]);
'use strict';

angular.module('updateTypesModule').controller('indexUpdateTypesController', ['$scope', 'connectUpdateTypeFactory', 'updatetypes', '$modalInstance', function($scope, connectUpdateTypeFactory, updatetypes, $modalInstance){
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.updateType = {};

	$scope.falseOnMemoRequest = function () {
		if($scope.updateType.requestMemo){
			$scope.updateType.requireDeadline = true;
			return true;
		}
	}

	$scope.createUpdateType = function(){
		connectUpdateTypeFactory.save({}, {'updatetypesInfo': $scope.updateType}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);
'use strict';

angular.module('updateTypesModule').factory('connectUpdateTypeFactory', ['$resource', function ($resource) {
	return $resource('api/v1/updatetype/:id/:action');
}])
'use strict';

angular.module('timelineModule').controller('indexTimelineController', ['$scope', 'connectTimelineFactory', 'socketConfigFactory', function ($scope, connectTimelineFactory, socketConfigFactory) {
	//listen to add
	socketConfigFactory.on('timeline', function (feeds) {
		getFeeds();
	});
	var getFeeds = function () {
		connectTimelineFactory.query(function (response) {
			$scope.feeds = response;
		});
	}
	//init the feeds
	getFeeds();
}]);
'use strict';

angular.module('timelineModule').factory('connectTimelineFactory', ['$resource', function ($resource) {
	return $resource('api/v1/timeline');
}]);
'use strict';

angular.module('uploadModule').controller('addUploadController', ['$scope', '$modalInstance', 'selectedCase', '$http', 'docs', '$modal', function ($scope, $modalInstance, selectedCase, $http, docs, $modal) {
	$scope.selectedCase = selectedCase;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.add = function(){
		$modal.open({
			template: '<h1 class="text-center"><img src="public/modules/config/img/loading.gif" /></h1>',
			backdrop: 'static',
			controller: ['$scope', 'docInfo', 'error', 'selectedCase', '$modalInstance', 'parentModalInstance', function ($scope, docInfo, error, selectedCase, $modalInstance, parentModalInstance) {
				var formData = new FormData();
				var doc = document.getElementById('doc').files[0];
				formData.append('name', docInfo.name);
				formData.append('description', docInfo.description);
				formData.append('doc', doc);

				$http.post('/api/v1/case/' + selectedCase._id + '/upload', formData, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				}).success(function(data, success){
					$modalInstance.dismiss('cancel');
					parentModalInstance.dismiss('cancel');
				})
				.error(function(data, error){
					error = data;
					$modalInstance.dismiss('cancel');
					parentModalInstance.dismiss('cancel');
				});
			}],
			resolve: {
				docInfo: function () {
					return $scope.docInfo;
				},
				error: function () {
					return $scope.error;
				},
				selectedCase: function () {
					return $scope.selectedCase;
				},
				parentModalInstance: function () {
					return $modalInstance;
				}
			}
		});
	}
}]);
'use strict';

angular.module('uploadModule').controller('indexUploadController', ['$scope', '$modalInstance', 'selectedCase', '$modal', '$http', 'connectCaseFactory', 'socketConfigFactory', function ($scope, $modalInstance, selectedCase, $modal, $http, connectCaseFactory, socketConfigFactory) {
	$scope.selectedCase = selectedCase;

	//listen to add
	socketConfigFactory.on('cases.update.docs', function (response) {
		$scope.allDocs();
	});
	//listen to update
	socketConfigFactory.on('cases.update.docs.update', function (response) {
		$scope.allDocs();
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.allDocs = function(){
		$http.get('/api/v1/case/' + $scope.selectedCase._id + '/docs')
		.success(function(data, success){
			$scope.docs = data;
		})
		.error(function(data, error){
			$scope.error = error.data;
		});	
	}

	//init get all docs
	$scope.allDocs();

	$scope.addDoc = function(){
		$modal.open({
			controller: 'addUploadController',
			templateUrl: 'public/modules/uploads/view/add.upload.view.html',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase;
				},
				docs: function () {
					return $scope.docs;
				}
			}
		});
	}

	$scope.downloadDoc = function(docId){
		return '/api/v1/case/' + $scope.selectedCase._id +'/download/' + docId;
	}

	$scope.removeDoc = function (index, id) {
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'doc', 'selectedCase', 'allDocs', function($scope, $modalInstance, doc, selectedCase, allDocs){
				$scope.message = {};
				$scope.message.title = 'حذف المستند';
				$scope.message.text = ' هل ترغب بحذف المستند ' + doc.name  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectCaseFactory.delete({'caseId': selectedCase._id, 'action': 'upload', 'actionId': id}, function(response){
						allDocs();
						$modalInstance.dismiss('cancel');
					}, function (error) {
						$scope.error = error
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				doc: function(){
					return $scope.docs[index];
				},
				allDocs: function () {
					return $scope.allDocs;
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}

}]);
'use strict';

angular.module('userModule').controller('indexUserController', ['$scope', 'users', 'connectUserFactory', '$modalInstance', function ($scope, users, connectUserFactory, $modalInstance) {
	//init user role
	$scope.userInfo = {};
	$scope.userInfo.role = 'employee';
	$scope.error = false;

	$scope.createNewUser = function(){
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			$modalInstance.dismiss('cancel');
			$scope.error = false;
			$scope.userCreated = true;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);
'use strict';

angular.module('userModule').controller('profileUserController', ['$scope', 'connectUserFactory', 'registerUserConfigFactory', '$timeout', function ($scope, connectUserFactory, registerUserConfigFactory, $timeout) {
	$scope.user = registerUserConfigFactory.getUser();

	$scope.pageTitle = $scope.user.firstName + ' ' + $scope.user.lastName

	$scope.profile = {
		email: $scope.user.email,
		mobilePhone: $scope.user.mobilePhone
	}

	$scope.isPasswordValid = function () {
		if($scope.profile.currentPassowrd || $scope.profile.newPassowrd || $scope.profile.repeatedNewPassowrd){
			if(!$scope.profile.currentPassowrd || !$scope.profile.newPassowrd || !$scope.profile.repeatedNewPassowrd){
				return true;
			} else {
				if($scope.profile.newPassowrd !== $scope.profile.repeatedNewPassowrd){
					return true;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}

	$scope.updateProfile = function () {
		connectUserFactory.update({'info': $scope.profile}, function (response) {
			$scope.profile.newPassowrd = '';
			$scope.profile.currentPassowrd = '';
			$scope.profile.repeatedNewPassowrd = '';
			$scope.success = true;
			$scope.error = false;
			$timeout(function () {
				$scope.success = false;
			}, 1500);
		}, function (error) {
			$scope.error = error.data.message;
			$timeout(function () {
				$scope.error = false;
			}, 1500);
		});
	}
}]);
'use strict';

angular.module('userModule').factory('connectUserFactory', ['$resource', function ($resource) {
	return $resource('/api/v1/user/:action/:byUserName/:id',
		{
			name: "@byUserName",
			action: "@action",
			id: "@id"
		},
		{
			"update": {
				method:"PUT"
			}
		});
}]);