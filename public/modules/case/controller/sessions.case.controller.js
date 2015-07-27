'use strict';

angular.module('caseModule').controller('sessionsCaseController', ['$scope', 'connectCaseFactory', function($scope, connectCaseFactory) {
	connectCaseFactory.query({'action': 'sessions', 'subaction': 'last'}, function(response){
		$scope.sessions = response;
	}, function(error){
		$scope.error = error.data.message;
	});
}]);