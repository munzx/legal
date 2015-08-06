'use strict';

angular.module('defendantModule').controller('indexDefendantController', ['$scope', '$modalInstance', 'defendants', 'connectDefendantFactory', 'selectedDefendants', 'caseRoles', function ($scope, $modalInstance, defendants, connectDefendantFactory, selectedDefendants, caseRoles) {
	$scope.createNewDefendant = function(){
		connectDefendantFactory.save({}, {'defendantInfo': $scope.newDefendant}, function(response){
			selectedDefendants.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.caseRoles = caseRoles;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

}]);