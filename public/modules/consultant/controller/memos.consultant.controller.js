'use strict';

angular.module('consultantModule').controller('memosConsultantController', ['$scope', 'connectCaseFactory', function ($scope, connectCaseFactory) {
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

	$scope.fullName = function(consultants){
		if(consultants.length == 0) return '';
		var info = consultants[consultants.length - 1];
		return info.firstName + ' ' + info.lastName;
	}


	$scope.showmemoDetails = function(index){

	}
}]);