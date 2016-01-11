'use strict';

angular.module('adminModule').controller('indexAdminController', ['$scope', '$state', 'registerUserConfigFactory', function ($scope, $state, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'admin') $state.go('signin');

	
}]);