'use strict';

angular.module('caseModule').controller('indexCaseController', ['$scope', 'cases', 'connectAdminFactory', '$modal', '$modalInstance', 'connectDefendantFactory', function ($scope, cases, connectAdminFactory, $modal, $modalInstance, connectDefendantFactory) {
	//init newCase
	$scope.newCase = {};
	//init selected clients
	$scope.selectedClients = [];
	//init selected defendants
	$scope.selectedDefendants = [];

	//show selected "step"
	$scope.step = function(num){
		switch(num){
			case 1:
				$scope.pageTitle = 'البلاغ';
				$scope.step1 = true;
				$scope.step2 = false;
				$scope.step3 = false;
				$scope.step4 = false;
				break;
			case 2:
				$scope.pageTitle = 'الموكلين';
				$scope.step1 = false;
				$scope.step2 = true;
				$scope.step3 = false;
				$scope.step4 = false;
				break;
			case 3:
				$scope.pageTitle = 'الخصوم';
				$scope.step1 = false;
				$scope.step2 = false;
				$scope.step3 = true;
				$scope.step4 = false;
				break;
			case 4:
				$scope.pageTitle = 'الوقائع';
				$scope.step1 = false;
				$scope.step2 = false;
				$scope.step3 = false;
				$scope.step4 = true;
				break;
		}
	}

	//init with step 1
	$scope.step(1);

	$scope.compeleteToProceedStep1 = function(){
		if(!$scope.newCase.caseDate || !$scope.newCase.caseNumber || !$scope.newCase.reportNumber || !$scope.newCase.court) return true;
		return false;
	}

	$scope.compeleteToProceedStep2 = function(){
		if($scope.selectedClients.length === 0) return true;
		return false;
	}

	$scope.compeleteToProceedStep3 = function(){
		if($scope.selectedDefendants.length === 0) return true;
		return false;
	}

	$scope.compeleteToProceedStep4 = function(){
		if(!$scope.newCase.consultant || !$scope.newCase.subject || !$scope.newCase.facts) return true;
		return false;
	}

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

	$scope.selectClient = function(){
		if($scope.newCase.client){
			$scope.selectedClients.push(angular.copy($scope.clients[$scope.newCase.client]));
			$scope.clients.splice($scope.newCase.client, 1);
		}
	}

	$scope.removeSelectedClient = function(index){
		$scope.clients.push(angular.copy($scope.selectedClients[index]));
		$scope.selectedClients.splice(index, 1);
	}

	$scope.showNewClientForm = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/create.client.view.html',
			controller: 'indexClientController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				clients: function(){
					return $scope.clients
				},
				selectedClients: function(){
					return $scope.selectedClients;
				}
			}
		});
	}

	$scope.selectDefendant = function(){
		if($scope.newCase.defendant){
			$scope.selectedDefendants.push(angular.copy($scope.defendants[$scope.newCase.defendant]));
			$scope.defendants.splice($scope.newCase.defendant, 1);
		}
	}

	$scope.removeSelectedDefendant = function(index, id){
		$scope.defendants.push(angular.copy($scope.selectedDefendants[index]));
		$scope.selectedDefendants.splice(index, 1);
	}

	$scope.showNewDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/create.defendant.view.html',
			controller: 'indexDefendantController',
			size: 'md',
			backdrop : 'static',
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


}]);