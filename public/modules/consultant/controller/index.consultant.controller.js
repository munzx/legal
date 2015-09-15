'use strict';

angular.module('consultantModule').controller('indexConsultantController', ['$scope', 'registerUserConfigFactory', '$state', function ($scope,registerUserConfigFactory, $state) {
	$scope.user = registerUserConfigFactory.getUser();
	if($scope.user === false) $state.go('signin');
	if($scope.user.role !== 'consultant') $state.go('signin');

	$state.go('consultant.memos');
}]);