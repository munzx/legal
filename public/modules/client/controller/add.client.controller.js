'use strict';

angular.module('clientModule').controller('addClientController', ['$scope', '$modalInstance', 'connectCaseFactory', 'caseId', 'clients', 'closeParentModal', 'connectCaseRoleFactory', function ($scope, $modalInstance, connectCaseFactory, caseId, clients, closeParentModal, connectCaseRoleFactory) {
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
		connectCaseFactory.save({'action': 'client', 'subaction': 'new'}, {'caseId': caseId, 'userInfo': $scope.userInfo}, function(response){
			clients.push(response);
			$modalInstance.dismiss('cancel');
			closeParentModal();
		}, function(error){
			$scope.error = error.data.message;
		});
	}


}]);