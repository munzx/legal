'use strict';

angular.module('employeeModule').controller('indexEmployeeController', ['$scope', '$state', 'registerUserConfigFactory', function ($scope, $state, registerUserConfigFactory) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'employee') $state.go('signin');


}]);