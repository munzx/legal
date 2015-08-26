'use strict';

angular.module('clientModule').controller('addClientController', ['$scope', '$modalInstance', 'connectCaseFactory', 'selectedCase', 'closeParentModal', 'connectCaseRoleFactory', function ($scope, $modalInstance, connectCaseFactory, selectedCase, closeParentModal, connectCaseRoleFactory) {
	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewClient = function(){
		$scope.error = false;
		$scope.userInfo.role = 'client';
		console.log($scope.userInfo);
		connectCaseFactory.save({'action': 'client', 'subaction': 'new'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			selectedCase.clients.push(response.client);
			selectedCase.updates.push(response.update);
			$modalInstance.dismiss('cancel');
			closeParentModal();
		}, function(error){
			$scope.error = error.data.message;
		});
	}


}]);