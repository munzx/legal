'use strict';

angular.module('caseModule').controller('indexCaseController', ['$scope', 'cases', 'connectAdminFactory', '$modal', '$modalInstance', 'connectDefendantFactory', function ($scope, cases, connectAdminFactory, $modal, $modalInstance, connectDefendantFactory) {
	//init selected defendants
	$scope.selectedDefendants = [];

	connectAdminFactory.query({page: 'court'}, function(response){
		$scope.courts = response;
	});

	connectAdminFactory.query({page: 'client'}, function(response){
		$scope.clients = response;
	});

	connectAdminFactory.query({page: 'consultant'}, function(response){
		$scope.consultants = response;
	});

	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.showNewDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/create.defendant.view.html',
			controller: 'indexDefendantController',
			size: 'md',
			resolve: {
				defendants: function(){
					return $scope.defendants
				},
				selectedDefendants: function(){
					return $scope.selectedDefendants;
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