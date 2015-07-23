'use strict';

angular.module('defendantModule').controller('indexDefendantController', ['$scope', '$modalInstance', 'defendants', 'connectDefendantFactory', 'selectedDefendants', function ($scope, $modalInstance, defendants, connectDefendantFactory, selectedDefendants) {
	$scope.createNewDefendant = function(){
		connectDefendantFactory.save({}, {'defendantInfo': $scope.newDefendant}, function(response){
			selectedDefendants.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);