'use strict';

angular.module('defendantModule').controller('addDefendantController', ['$scope', '$modalInstance', 'connectCaseRoleFactory', 'closeParentModal', 'selectedCase', 'connectCaseFactory', function ($scope, $modalInstance, connectCaseRoleFactory, closeParentModal, selectedCase, connectCaseFactory) {
	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewDefendant = function(){
		$scope.error = false;
		connectCaseFactory.save({'action': 'defendant', 'subaction': 'new'}, {'caseId': selectedCase._id, 'userInfo': $scope.newDefendant}, function(response){
			$modalInstance.dismiss('cancel');
			closeParentModal();
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);