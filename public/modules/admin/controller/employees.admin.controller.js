'use strict';

angular.module('adminModule').controller('employeesAdminController', ['$scope', 'connectAdminFactory', 'connectUserFactory', function ($scope, connectAdminFactory, connectUserFactory) {
	connectAdminFactory.query({page: 'employee'}, function(response){
		$scope.employees = response;
	});

	$scope.removeEmployee = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.error = false;
			$scope.employees.splice(index, 1);
		}, function(error){
			$scope.newClinetCreated = false;
			$scope.error = error.data.message;
		});
	}


}]);