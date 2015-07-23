'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', '$modal', function ($scope, $state, connectUserFactory, $modal) {
	connectUserFactory.query({}, function(response){
		$scope.users = response;
	}, function(error){
		$scope.error = error.data.message;
	});

	$scope.removeUserInfo = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.users.splice(index, 1);
			$scope.error = false;
		}, function(error){
			$scope.error = response.data.message;
		});
	}

	$scope.showNewUserForm = function(){
		$modal.open({
			templateUrl: 'public/modules/user/view/create.user.view.html',
			controller: 'indexUserController',
			size: 'md',
			backdrop : 'static',
			resolve: {
				users: function(){
					return $scope.users;
				}
			}
		});
	}

}]);