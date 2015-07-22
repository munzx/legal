'use strict';

angular.module('defendantModule').controller('indexDefendantController', ['$scope', '$modalInstance', 'defendants', function ($scope, $modalInstance, defendants) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	console.log(defendants);
	
}]);