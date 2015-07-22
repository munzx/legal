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
			templateUrl: 'public/modules/admin/view/create.users.admin.view.html',
			controller: 'createUserAdminController',
			resolve: {
				users: function(){
					return $scope.users;
				}
			}
		});
	}

}]);