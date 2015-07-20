'use strict';

angular.module('adminModule').controller('courtsAdminController', ['$scope', 'connectAdminFactory', '$state', function ($scope, connectAdminFactory, $state) {
	$scope.getCourts = function(){
		connectAdminFactory.query({page: 'court'}, function(response){
			$scope.courts = response;
		});
	}

	//init getCourts
	$scope.getCourts();

	$scope.showNewCourtForm = function(){
		$scope.error = false;
		$state.go('admin.courts.create', {}, {reload: true});
	}

	//init
	$scope.courtInfo = {};
	//default value
	$scope.courtInfo.city = 'دبي';

	$scope.newCourteSuccess = false;
	$scope.createCourte = function(){
		connectAdminFactory.save({page: 'court'}, {'courtInfo': $scope.courtInfo}, function(response){
			$scope.error = false;
			$scope.newCourteSuccess = true;
			$scope.courts.push(response);
		}, function(response){
			$scope.error = response.data.message;
		});
	}

	$scope.removeCourtInfo = function(index, id){
		connectAdminFactory.delete({page: 'court', param: id}, function(response){
			$scope.error = false;
			$scope.courts.splice(index, 1);
		}, function(error){
			$scope.error = response.data.message;
		});
	}

	$scope.goBackToCourts = function(){
		$scope.error = false;
		$state.go('admin.courts', {}, {reload: true});
	}

}]);