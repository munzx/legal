'use strict';

angular.module('adminModule').controller('defendantAdminController', ['$scope', 'connectDefendantFactory', function ($scope, connectDefendantFactory) {
	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.removeDefendant = function(index, id){
		connectDefendantFactory.delete({'id': id}, function(response){
			$scope.error = false;
			$scope.defendants.splice(index, 1);
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);