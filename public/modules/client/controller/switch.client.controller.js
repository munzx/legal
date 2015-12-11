'use strict';

angular.module('clientModule').controller('switchClientController', ['$scope', 'connectAdminFactory', '$modalInstance', '$modal', 'selectedCase', 'connectCaseRoleFactory', 'connectCaseFactory', function ($scope, connectAdminFactory, $modalInstance, $modal, selectedCase, connectCaseRoleFactory, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	connectAdminFactory.query({page: 'client', action: 'available'}, function(response){
		$scope.clients = response;
	});

	connectCaseRoleFactory.query({action: 'available'}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.creatClient = function(){
		$scope.error = false;
		$scope.userInfo.userId = $scope.clients[$scope.userIndex]._id;
		connectCaseFactory.save({'action': 'client'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
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
					return $scope.selectedCase;
				},
				closeParentModal: function(){
					return $scope.closeModal;
				}
			}
		});
	}


}]);