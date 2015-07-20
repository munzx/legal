'use strict';

angular.module('adminModule').controller('clientsAdminController', ['$scope', 'connectAdminFactory', '$state', function ($scope, connectAdminFactory, $state) {
	connectAdminFactory.query({page: 'client'}, function(response){
		$scope.clients = response;
	});

	$scope.error = false;
	$scope.newClinetCreated = false;

	$scope.showNewClientForm = function(){
		$state.go('admin.clients.create', {}, {reload: true});
	}

	$scope.cancelNewClient = function(){
		$state.go('admin.clients', {}, {reload: true});
	}

	$scope.createNewClient = function(){
		console.log($scope.clientInfo);
		connectAdminFactory.save({page: 'client'}, {'clientInfo': $scope.clientInfo}, function(response){
			$scope.error = false;
			$scope.newClinetCreated = true;
		}, function(error){
			$scope.newClinetCreated = false;
			$scope.error = error.data.message;
		});
	}

	$scope.removeClient = function(index, id){
		connectAdminFactory.delete({page: 'client', param: id}, function(response){
			$scope.error = false;
			$scope.clients.splice(index, 1);
		}, function(error){
			$scope.newClinetCreated = false;
			$scope.error = error.data.message;
		});
	}

}]);