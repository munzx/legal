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
