'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', '$modal', 'connectAdminFactory', function ($scope, $state, connectUserFactory, $modal, connectAdminFactory) {

	function activeSubNav(link){
		$scope.activeLinkArray = [];
		$scope.activeLinkArray['client'] = '';
		$scope.activeLinkArray['employee'] = '';
		$scope.activeLinkArray['consultant'] = '';
		$scope.activeLinkArray['all'] = '';
		$scope.activeLinkArray[link] = 'active';
	}

	$scope.getAll = function(){
		activeSubNav('all');
		connectUserFactory.query({}, function(response){
			$scope.users = response;
		}, function(error){
			$scope.error = error.data.message;
		});
	}

	$scope.getClients = function(){
		activeSubNav('client');
		connectAdminFactory.query({page: 'client'}, function(response){
			$scope.users = response;
		});
	}

	$scope.getConsultants = function(){
		activeSubNav('consultant');
		connectAdminFactory.query({page: 'consultant'}, function(response){
			$scope.users = response;
		});
	}

	$scope.getEmployees = function(){
		activeSubNav('employee');
		connectAdminFactory.query({page: 'employee'}, function(response){
			$scope.users = response;
		});
	}

	//init getAll
	$scope.getAll();

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