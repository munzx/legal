'use strict';

angular.module('caseRoleModule').controller('indexCaseRoleController', ['$scope', '$modalInstance', 'caseRoles', 'connectCaseRoleFactory', function ($scope, $modalInstance, caseRoles, connectCaseRoleFactory) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	$scope.createNewCaseRole = function(){
		connectCaseRoleFactory.save({}, {'caseRoleInfo': $scope.newCaseRole}, function(response){
			caseRoles.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

}]);