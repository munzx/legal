'use strict';

angular.module('clientModule').controller('dashboardClientController', ['$scope', 'registerUserConfigFactory', '$state', function ($scope, registerUserConfigFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'client') $state.go('signin');

	$state.go('client.case');
}]);