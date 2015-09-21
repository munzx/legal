'use strict';

angular.module('caseModule').controller('sessionsCaseController', ['$scope', 'connectCaseFactory', '$modal', 'registerUserConfigFactory', function($scope, connectCaseFactory, $modal, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	$scope.isAdmin = ($scope.user.role === 'admin')? true: false;

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