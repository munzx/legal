'use strict';

angular.module('userModule').controller('createUserAdminController', ['$scope', 'users', 'connectUserFactory', '$modalInstance', function ($scope, users, connectUserFactory, $modalInstance) {
	//init user role
	$scope.userInfo = {};
	$scope.userInfo.role = 'employee';
	$scope.error = false;

	$scope.createNewUser = function(){
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			users.push(response);
			$modalInstance.dismiss('cancel');
			$scope.error = false;
			$scope.userCreated = true;
		}, function(error){
			$scope.error = error.data.message;
	
		});
	}

	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}
}]);