'use strict';

angular.module('caseModule').controller('updateCaseController', ['$scope', 'connectCaseFactory', 'selectedCase', '$modalInstance', 'connectUpdateTypeFactory', function ($scope, connectCaseFactory, selectedCase, $modalInstance, connectUpdateTypeFactory) {
	connectUpdateTypeFactory.query({}, function(response){
		$scope.caseUpdates = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.addNewCaseUpdate = function(){
		connectCaseFactory.save({'action': 'caseupdate', 'id': selectedCase._id}, {'update': $scope.newUpdate}, function(response){
			selectedCase.updates.push(response.updates[response.updates.length - 1]);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.isValid = function(){
		if($scope.newUpdate){
			if(!$scope.newUpdate.name || !$scope.newUpdate.info) return false;
			return true;
		}
		return false;
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);