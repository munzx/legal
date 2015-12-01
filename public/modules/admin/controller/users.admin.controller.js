'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', '$modal', 'connectAdminFactory', '$http', 'limitToFilter', function ($scope, $state, connectUserFactory, $modal, connectAdminFactory, $http, limitToFilter) {

	//make the clicked link active
	function activeSubNav(link){
		//first make all links unactive
		$scope.activeLinkArray = [];
		$scope.activeLinkArray['client'] = '';
		$scope.activeLinkArray['employee'] = '';
		$scope.activeLinkArray['consultant'] = '';
		$scope.activeLinkArray['all'] = '';
		//then active the clicked link
		$scope.activeLinkArray[link] = 'active';
	}

	$scope.searchResult = function(val){
	    return $http.get('/api/v1/user/search/' + val).then(function(response){
	    	return limitToFilter(response.data, 15);
	    });	
	}

	$scope.updateSearch = function(){
		if($scope.searchPhrase){
			$scope.searchResult();
		}
	}

	//when selecting a row in search results
	$scope.onSelect = function ($item, $model, $label) {
		$scope.users = [$item];
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
		connectAdminFactory.query({page: 'employee', action: 'nonlegal'}, function(response){
			$scope.users = response;
		});
	}

	//init getAll
	$scope.getAll();

	$scope.removeUserInfo = function(index, userId){
		connectUserFactory.delete({'id': userId}, function(response){
			$scope.users[index] = response;
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