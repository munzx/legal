'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', function ($scope, $state, connectUserFactory) {
	connectUserFactory.query({}, function(response){
		$scope.users = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	//init user role
	$scope.userInfo = {};
	$scope.userInfo.role = 'employee';
	$scope.error = false;
	$scope.userCreated = false;

	$scope.showNewUserForm = function(){
		$state.go('admin.users.create');
	}

	$scope.createNewUser = function(){
		connectUserFactory.save({}, {'userInfo': $scope.userInfo}, function(response){
			$scope.error = false;
			$scope.userCreated = true;
		}, function(error){
			$scope.error = error.data.message;
			$scope.userCreated = false;
		});
	}

	$scope.removeUserInfo = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.users.splice(index, 1);
			$scope.error = false;
			$scope.userCreated = false;
		}, function(error){
			$scope.error = response.data.message;
			$scope.userCreated = false;
		});
	}

	$scope.backToUsers = function(){
		$state.go('admin.users');
	}

}]);