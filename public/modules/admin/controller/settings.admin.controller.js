'use strict';

angular.module('adminModule').controller('settingsAdminController', ['$scope', '$state', function ($scope, $state) {
	//startup page
	$state.go('admin.settings.courts');
}]);