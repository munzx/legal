'use strict';

angular.module('adminModule').controller('defendantAdminController', ['$scope', 'connectDefendantFactory', '$http', 'limitToFilter', function ($scope, connectDefendantFactory, $http, limitToFilter) {
	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.removeDefendant = function(index, id){
		connectDefendantFactory.delete({'id': id}, function(response){
			$scope.error = false;
			$scope.defendants[index] = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);