'use strict';

angular.module('caseModule').controller('updateCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', 'connectUpdateTypeFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, connectUpdateTypeFactory) {
	//init newDate
	$scope.newUpdate = {};
	$scope.newUpdate.session = {};

	connectUpdateTypeFactory.query({}, function(response){
		$scope.caseUpdates = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.checkIfIdRequired = function(){
		$scope.showRequireId = $scope.caseUpdates[$scope.newUpdate.name].requiredId;
		$scope.showRequireIdTitle = $scope.caseUpdates[$scope.newUpdate.name].requiredIdTitle;
		$scope.newUpdate.session.updateId = ($scope.showRequireId === false)? $scope.newUpdate.session.updateId: '';
	}

	$scope.addNewCaseUpdate = function(){
		//get the real name through the array index
		$scope.newUpdate.name = $scope.caseUpdates[$scope.newUpdate.name].name;
		connectCaseFactory.save({'action': 'caseupdate', 'id': selectedCase._id}, {'update': $scope.newUpdate}, function(response){
			selectedCase.updates = response.updates;
			selectedCase.sessions = response.sessions;
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
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