'use strict';

angular.module('clientModule').controller('switchClientController', ['$scope', 'connectAdminFactory', '$modalInstance', '$modal', 'selectedCase', 'connectCaseRoleFactory', 'connectCaseFactory', function ($scope, connectAdminFactory, $modalInstance, $modal, selectedCase, connectCaseRoleFactory, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	connectAdminFactory.query({page: 'client'}, function(response){
		$scope.clients = response;
	});

	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewClient = function(){
		$scope.error = false;
		$scope.userInfo.userId = $scope.clients[$scope.userIndex]._id;
		connectCaseFactory.save({'action': 'client'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			$scope.selectedCase.client.push(response.client);
			$scope.selectedCase.updates.push(response.update);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.showCreateClientForm = function(){
		$modal.open({
			templateUrl: 'public/modules/client/view/add.client.view.html',
			controller: 'addClientController',
			backdrop: 'static',
			resolve: {
				selectedCase: function(){
					return $scope.selectedCase._id;
				},
				closeParentModal: function(){
					return $scope.closeModal;
				}
			}
		});
	}


}]);