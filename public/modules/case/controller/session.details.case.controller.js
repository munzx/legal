'use strict';

angular.module('caseModule').controller('sessionDetailsCaseController', ['$scope', '$modalInstance', 'sessionInfo', function ($scope, $modalInstance, sessionInfo) {
	$scope.sessionInfo = sessionInfo;

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);