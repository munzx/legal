'use strict';

angular.module('calendarModule').controller('createTaskCalendarController', ['$scope', '$modalInstance', 'connectCalendarFactory', 'connectUserFactory', 'tasks', function ($scope, $modalInstance, connectCalendarFactory, connectUserFactory, tasks) {
	$scope.closeModal = function(){
		$modalInstance.dismiss('cancel');
	}

	connectUserFactory.query({}, function(response){
		$scope.users = response;
	});

	$scope.createNewTask = function(){
		//get the selected user from users by index
		$scope.info.responsibility = $scope.users[$scope.info.responsibilityIndex]._id;
		connectCalendarFactory.save({}, {'info': $scope.info}, function(response){
			tasks.push(response);
			$modalInstance.dismiss('cancel');
		}, function(error){
			console.log(error);
		});
	}


}]);