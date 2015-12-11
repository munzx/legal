'use strict';

angular.module('caseModule').controller('createCaseController', ['$scope', 'cases', 'connectAdminFactory', '$modal', '$modalInstance', 'connectDefendantFactory', 'connectCaseRoleFactory', 'connectCaseFactory', 'connectCaseTypeFactory', 'socketConfigFactory', function ($scope, cases, connectAdminFactory, $modal, $modalInstance, connectDefendantFactory, connectCaseRoleFactory, connectCaseFactory, connectCaseTypeFactory, socketConfigFactory) {

	var getCaseTypes = function () {
		connectCaseTypeFactory.query({'action': 'available'}, function(response){
			$scope.caseTypes = response;
		});
	}

	var getCourts = function () {
		connectAdminFactory.query({page: 'court', action: 'available'}, function(response){
			$scope.courts = response;
		});
	}

	var getCaseRoles = function () {
		connectCaseRoleFactory.query({action: 'available'}, function(response){
			$scope.caseRoles = response;
		});
	}

	var getClients = function () {
		connectAdminFactory.query({page: 'client', action: 'available'}, function(response){
			$scope.clients = response;
		});		
	}

	var getConsultants = function () {
		connectAdminFactory.query({page: 'consultant', action: 'available'}, function(response){
			$scope.consultants = response;
		});		
	}

	var getDefendants = function () {
		connectDefendantFactory.query({'action': 'available'}, function(response){
			$scope.defendants = response;
		});		
	}

	//init
	$scope.newCase = {};
	$scope.selectedClients = [];
	$scope.selectedDefendants = [];

	getCaseTypes();
	getCourts();
	getCaseRoles();
	getClients();
	getConsultants();
	getDefendants();


	//listen to adds and updates
	//listen to caseRoles add
	socketConfigFactory.on('caseRoles.available.add', function (response) {
		$scope.caseRoles.push(response);
	});
	//listen to caseRoles update
	socketConfigFactory.on('caseRoles.available.update', function (response) {
		getCaseRoles();
	});
	//listen to add
	socketConfigFactory.on('caseType.available.add', function (response) {
		$scope.caseTypes.push(response);
	});
	//listen to update
	socketConfigFactory.on('caseType.available.update', function (response) {
		getCaseTypes();
	});
	//listen to court add
	socketConfigFactory.on('court.available.add', function (response) {
		$scope.courts.push(response);
	});
	//listen to court add
	socketConfigFactory.on('court.available.update', function (response) {
		getCourts();
	});


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
		if(!$scope.newCase.caseType || !$scope.newCase.caseDate || !$scope.newCase.caseNumber || !$scope.newCase.court) return true;
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



	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.selectClient = function(){
		if($scope.newCase.client){
			$scope.selectedClients.push(angular.copy($scope.clients[$scope.newCase.client]));
			$scope.clients.splice($scope.newCase.client, 1);
			$scope.newCase.client = '';
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
				},
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	$scope.selectDefendant = function(){
		if($scope.newCase.defendant){
			$scope.selectedDefendants.push(angular.copy($scope.defendants[$scope.newCase.defendant]));
			$scope.defendants.splice($scope.newCase.defendant, 1);
			$scope.newCase.defendant = '';
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
				},
				caseRoles: function(){
					return $scope.caseRoles;
				}
			}
		});
	}

	//get ids in objects array
	var getIds = function(IDs){
		var allIds = [];
		IDs.forEach(function(info){
			allIds.push(info._id);
		});
		return allIds;
	}

	//get ids and roles in objects array
	var getIdsAndRoles = function(usersInfo){
		var allIds = [];
		usersInfo.forEach(function(info){
			allIds.push({
				user: info._id,
				role: info.caseRole
			});
		});
		return allIds;
	}

	$scope.createNewCase = function(){
		$scope.error = false;
		var caseInfo = {
			caseType: $scope.newCase.caseType,
			defendant: getIdsAndRoles($scope.selectedDefendants),
			client: getIdsAndRoles($scope.selectedClients),
			caseDate: $scope.newCase.caseDate,
			court: $scope.newCase.court,
			reportNumber: $scope.newCase.reportNumber,
			caseNumber: $scope.newCase.caseNumber,
			subject: $scope.newCase.subject,
			facts: $scope.newCase.facts,
			consultant: $scope.consultants[$scope.newCase.consultant]._id,
			status: 'open'
		}

		connectCaseFactory.save({}, {'caseInfo': caseInfo}, function(response){
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});

	}

}]);