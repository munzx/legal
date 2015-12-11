'use strict';

angular.module('adminModule').controller('usersAdminController', ['$scope', '$state', 'connectUserFactory', '$modal', 'connectAdminFactory', '$http', 'limitToFilter', 'socketConfigFactory', 'helperConfigFactory', function ($scope, $state, connectUserFactory, $modal, connectAdminFactory, $http, limitToFilter, socketConfigFactory, helperConfigFactory) {

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


	//listen to user add
	socketConfigFactory.on('user.add', function (response) {
		$scope.users.push(response);
	});

	//listen to user update
	socketConfigFactory.on('user.update', function (response) {
		var getIndex = helperConfigFactory.map($scope.users, function (user) {
			if(response._id.toString() == user._id.toString()){
				return true;
			}
		});
		if(getIndex){
			$scope.users[getIndex] = response;
		}
	});


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
		var modalInstance = $modal.open({
			templateUrl: 'public/modules/config/view/message/confirm.message.config.view.html',
			backdrop: 'static',
			controller: ['$scope', '$modalInstance', 'userId', 'users', 'index', function($scope, $modalInstance, userId, users, index){
				$scope.message = {};
				$scope.message.title = 'حذف مستخدم';
				$scope.message.text = ' هل ترغب بحذف المستخدم ' + users[index].firstName  + ' ' + users[index].lastName  + ' ?';
				$scope.message.confirm = 'نعم';
				$scope.message.cancel = 'لا';

				$scope.confirm = function(){
					connectUserFactory.delete({'id': userId}, function(response){
						$modalInstance.dismiss('cancel');
					}, function(error){
						$scope.error = response.data.message;
					});
				}

				$scope.cancel = function(){
					$modalInstance.dismiss('cancel');
				}

				$scope.closeModal = function(){
					$modalInstance.dismiss('cancel');
				}
			}],
			resolve: {
				userId: function(){
					return userId;
				},
				users: function () {
					return $scope.users;
				},
				index: function(){
					return index;
				}
			}
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