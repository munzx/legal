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