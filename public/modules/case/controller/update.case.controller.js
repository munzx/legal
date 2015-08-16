'use strict';

angular.module('caseModule').controller('updateCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', 'connectUpdateTypeFactory', 'connectCaseRoleFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, connectUpdateTypeFactory, connectCaseRoleFactory) {
	$scope.selectedCase = selectedCase;

	//init newDate
	$scope.newUpdate = {};
	$scope.newUpdate.session = {};

	connectUpdateTypeFactory.query({}, function(response){
		$scope.caseUpdates = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	});

	//save the client and the defendants current info
	$scope.udatedClientInfo = angular.copy(selectedCase.client);
	$scope.udatedDefendantInfo = angular.copy(selectedCase.defendant);

	$scope.updateclientNewRole = function(index, newRole){
		//make the new role the last role in the array
		//use this to avoid adding new roles everytime the user change the value
		//thats why push is not used
		$scope.udatedClientInfo[index].role[selectedCase.client[index].role.length] = newRole;
	}

	$scope.updateDefendantNewRole = function(index, newRole){
		//make the new role the last role in the array
		//use this to avoid adding new roles everytime the user change the value
		//thats why push is not used
		$scope.udatedDefendantInfo[index].role[selectedCase.defendant[index].role.length] = newRole;
	}

	$scope.checkIfIdRequired = function(){
		$scope.showRequireId = $scope.caseUpdates[$scope.newUpdate.name].requiredId || '';
		$scope.requireRoleUpdate = $scope.caseUpdates[$scope.newUpdate.name].requireRoleUpdate || '';
		$scope.showRequireIdTitle = $scope.caseUpdates[$scope.newUpdate.name].requiredIdTitle || '';
		//if the 'requireId' is empty then make it empty instead of false to avoid error
		$scope.newUpdate.session.updateId = ($scope.showRequireId === false)? $scope.newUpdate.session.updateId: '';
	}

	$scope.addNewCaseUpdate = function(){
		//the name in the 'caseUpdates' variable is the index!!! so we use
		//the following to get the real name through the array index
		//if a memo is required 'memoRequired' then make it true
		console.log($scope.caseUpdates[$scope.newUpdate.name]);
		$scope.newUpdate.memoRequired = $scope.caseUpdates[$scope.newUpdate.name].requestMemo? true: false;
		$scope.newUpdate.name = $scope.caseUpdates[$scope.newUpdate.name].name;
		//add the roles updates to the case update info
		$scope.newUpdate.clientInfo = $scope.udatedClientInfo;
		$scope.newUpdate.defendantInfo = $scope.udatedDefendantInfo;

		// console.log($scope.newUpdate);  

		connectCaseFactory.save({'action': 'caseupdate', 'id': selectedCase._id}, {'update': $scope.newUpdate}, function(response){
			console.log(response);
			selectedCase.updates = response.updates;
			selectedCase.sessions = response.sessions;
			//update the case clients and defendants info
			selectedCase.client = response.client;
			selectedCase.defendant = response.defendant;
			$modalInstance.dismiss('cancel');
		}, function(error){
			console.log('something went wrong');
			$scope.error = error.message;
		});
	}

	$scope.isValid = function(){
		if($scope.newUpdate){
			if(!$scope.newUpdate.name || !$scope.newUpdate.info || !$scope.newUpdate.session.newDate || !$scope.newUpdate.session.newTime) return false;
			return true;
		}
		return false;
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);