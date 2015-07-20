'use strict';

angular.module('adminModule').controller('consultantsAdminController', ['$scope', 'connectAdminFactory','connectUserFactory', function ($scope, connectAdminFactory, connectUserFactory) {
	connectAdminFactory.query({page: 'consultant'}, function(response){
		$scope.consultants = response;
	});

	$scope.removeConsultant = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.error = false;
			$scope.consultants.splice(index, 1);
		}, function(error){
			$scope.newClinetCreated = false;
			$scope.error = error.data.message;
		});
	}

}]);