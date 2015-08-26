'use strict';

angular.module('defendantModule').controller('switchDefendantController', ['$scope', '$modal', '$modalInstance', 'connectDefendantFactory', 'connectCaseRoleFactory', 'selectedCase', 'connectCaseFactory', function ($scope, $modal, $modalInstance, connectDefendantFactory, connectCaseRoleFactory, selectedCase, connectCaseFactory) {
	$scope.selectedCase = selectedCase;

	connectDefendantFactory.query({}, function(response){
		$scope.defendants = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	connectCaseRoleFactory.query({}, function(response){
		$scope.caseRoles = response;
	});

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewDefendant = function(){
		$scope.error = false;
		$scope.userInfo.userId = $scope.defendants[$scope.userIndex]._id;
		connectCaseFactory.save({'action': 'defendant'}, {'caseId': selectedCase._id, 'userInfo': $scope.userInfo}, function(response){
			$scope.selectedCase.defendant.push(response.defendant);
			$scope.selectedCase.updates.push(response.update);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.showCreateDefendantForm = function(){
		$modal.open({
			templateUrl: 'public/modules/defendant/view/add.defendant.view.html',
			controller: 'addDefendantController',
			backdrop: 'static',
			resolve: {
				closeParentModal: function(){
					return $scope.closeModal;
				},
				selectedCase: function(){
					return $scope.selectedCase;
				}
			}
		});
	}


}]);