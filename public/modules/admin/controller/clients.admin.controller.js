'use strict';

angular.module('adminModule').controller('clientsAdminController', ['$scope', 'connectAdminFactory', 'connectUserFactory', '$state', function ($scope, connectAdminFactory, connectUserFactory, $state) {
	connectAdminFactory.query({page: 'client'}, function(response){
		$scope.clients = response;
	});

	$scope.error = false;
	$scope.newClinetCreated = false;

	$scope.removeClient = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.error = false;
			$scope.clients.splice(index, 1);
		}, function(error){
			$scope.newClinetCreated = false;
			$scope.error = error.data.message;
		});
	}

}]);