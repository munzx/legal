'use strict';

angular.module('adminModule').controller('casesAdminController', ['$scope', 'connectAdminFactory', '$state', '$modal', function ($scope, connectAdminFactory, $state, $modal) {
	connectAdminFactory.query({page: 'case'}, function(response){
		$scope.cases = response;
	});

	connectAdminFactory.query({page: 'court'}, function(response){
		$scope.courts = response;
	});

	connectAdminFactory.query({page: 'client'}, function(response){
		$scope.clients = response;
	});

	connectAdminFactory.query({page: 'consultant'}, function(response){
		$scope.consultants = response;
	});

	$scope.showNewCaseForm = function(){
		$state.go('admin.cases.create', {}, {reload: true});
	}

	$scope.showNewDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/create.defendant.view.html',
			controller: 'indexDefendantController',
			size: 'md',
			resolve: {
				defendants: function(){
					return $scope.defendants
				}
			}
		});
	}

	$scope.showNewClientForm = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/create.client.view.html',
			controller: 'indexClientController',
			size: 'md',
			resolve: {
				clients: function(){
					return $scope.clients
				}
			}
		});
	}



}]);