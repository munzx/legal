'use strict';

angular.module('legality').controller('ModalInstanceConfigController', ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance) {
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	}
}]);