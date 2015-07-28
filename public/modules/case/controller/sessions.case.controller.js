'use strict';

angular.module('caseModule').controller('sessionsCaseController', ['$scope', 'connectCaseFactory', '$modal', function($scope, connectCaseFactory, $modal) {
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

	//init upcoming
	$scope.upcoming();

	$scope.showSessionDetails = function(index){
		$modal.open({
			templateUrl: 'public/modules/case/view/session.details.case.view.html',
			controller: 'sessionDetailsCaseController',
			backDrop: 'static',
			resolve: {
				sessionInfo: function(){
					return $scope.sessions[index];
				}
			}
		});
	}

}]);