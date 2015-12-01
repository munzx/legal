'use strict';

angular.module('caseModule').controller('updateCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', 'connectUpdateTypeFactory', 'connectCaseRoleFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, connectUpdateTypeFactory, connectCaseRoleFactory) {
	$scope.selectedCase = selectedCase;

	//init newDate
	$scope.newUpdate = {};
	$scope.newUpdate.session = {};

	connectUpdateTypeFactory.query({'action': 'available'}, function(response){
		$scope.caseUpdates = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	connectCaseFactory.query({action: 'updates', actionId: $scope.selectedCase._id }, function (response) {
		$scope.caseUpdatesWithUpdateId = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	//save the clients and the defendants current info
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

	$scope.updateOptions = function () {
		if(!$scope.caseUpdates[$scope.newUpdate.name]){ return {}; };
		return {
			'requiredId': $scope.caseUpdates[$scope.newUpdate.name].requiredId,
			'requireRoleUpdate': $scope.caseUpdates[$scope.newUpdate.name].requireRoleUpdate,
			'requiredIdTitle': $scope.caseUpdates[$scope.newUpdate.name].requiredIdTitle,
			'requireNextSession':$scope.caseUpdates[$scope.newUpdate.name].requireNextSession,
			'requireRemarks': $scope.caseUpdates[$scope.newUpdate.name].requireRemarks,
			'requestMemo': $scope.caseUpdates[$scope.newUpdate.name].requestMemo
		}
	}

	$scope.addNewCaseUpdate = function(){
		//the name in the 'caseUpdates' variable is the index!!! so we use
		//the following to get the real name through the array index
		//if a memo is required 'memoRequired' then make it true
		$scope.newUpdate.memoRequired = $scope.caseUpdates[$scope.newUpdate.name].requestMemo? true: false;
		$scope.newUpdate.sessionRequired = $scope.caseUpdates[$scope.newUpdate.name].requireNextSession? true: false;
		$scope.newUpdate.name = $scope.caseUpdates[$scope.newUpdate.name].name;
		//add the roles updates to the case update info
		$scope.newUpdate.clientInfo = $scope.udatedClientInfo;
		$scope.newUpdate.defendantInfo = $scope.udatedDefendantInfo;

		//if session is required
		if($scope.newUpdate.sessionRequired){
			if($scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex]){
				$scope.newUpdate.session.refType = $scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex].updateType;
				$scope.newUpdate.session.refNumber = $scope.caseUpdatesWithUpdateId[$scope.sessionUpdateIndex].updateId;		
			}
		}

		//if memo is required
		//the memo date is passed through UI "memoRequiredDate"
		if($scope.newUpdate.memoRequired){
			if($scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex]){
				$scope.newUpdate.memoId = $scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex].updateId;
				$scope.newUpdate.memoType = $scope.caseUpdatesWithUpdateId[$scope.newUpdate.memoUpdateIndex].updateType;
			}
		}

		connectCaseFactory.save({'action': 'caseupdate', 'id': selectedCase._id}, {'update': $scope.newUpdate}, function(response){
			selectedCase.updates = response.updates;
			selectedCase.sessions = response.sessions;
			//update the case clients and defendants info
			selectedCase.client = response.client;
			selectedCase.defendant = response.defendant;
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.message;
		});
	}

	$scope.checkIfIdRequired = function(){
		var options = $scope.updateOptions();
		$scope.showRequireId =  options.requiredId || '';
		$scope.requireRoleUpdate =  options.requireRoleUpdate || '';
		$scope.showRequireIdTitle =  options.requiredIdTitle || '';
		$scope.showNextSessionBox =  options.requireNextSession || '';
		$scope.showRemarks =  options.requireRemarks || '';
		$scope.showMemoBox = options.requestMemo || '';
		//if the 'requireId' is empty then make it empty instead of false to avoid error
		//after the update , not sure if the following line is needed
		$scope.newUpdate.session.updateId = ($scope.showRequireId === false)? $scope.newUpdate.session.updateId: '';
	}

	$scope.isValid = function(){
		if($scope.newUpdate){
			if(!$scope.newUpdate.name){ return false; };
			var valid = true;
			var options = $scope.updateOptions();

			if(!options){ return false; };

			if(options.requiredId){
				if(!$scope.newUpdate.session.updateId){ valid = false; };
			}

			if(options.requestMemo){}

			if(options.requireRoleUpdate){}

			if(options.requiredIdTitle){}

			if(options.requireNextSession){
				if(!$scope.newUpdate.session.newDate || !$scope.newUpdate.session.newTime){ valid = false; };
			}

			if(options.requireRemarks){
				if(!$scope.newUpdate.info){ valid = false; };
			}

			return valid;
		} else {
			return false;
		}
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);