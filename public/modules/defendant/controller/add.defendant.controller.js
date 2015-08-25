'use strict';

angular.module('defendantModule').controller('addDefendantController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);